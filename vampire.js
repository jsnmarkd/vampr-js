class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }
    return numberOfVampires;
  }
  // Recursion upwards - Leaf node to Root node
  // if (!this.creator) {
  //   return 0;
  // }
  // return 1 + this.creator.numberOfVampiresFromOriginal;

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    for (const i of this.offspring) {
      if (i === vampire.creator) {
        return true;
      }
    }
    return this === vampire.creator;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    // Recursion downwards - Root node to Leaf node
    if (this.name === name) {
      return this;
    }

    for (const child of this.offspring) {
      const found = child.vampireWithName(name);
      if (found) {
        return found;
      }
    }

    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let count = 0;
    for (const child of this.offspring) {
      count += child.totalDescendents + 1;
    }
    return count;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let vampires = [];
    
    if (this.yearConverted > 1980) {
      vampires.push(this);
    }

    for (const child of this.offspring) {
      // console.log(child.allMillennialVampires);
      vampires = vampires.concat(child.allMillennialVampires);
    }
    console.log(vampires);
    return vampires;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let currentVampire = this;
    if (!vampire.creator || currentVampire.creator === vampire) {
      return vampire;
    }
    return currentVampire;
  }
}

module.exports = Vampire;

