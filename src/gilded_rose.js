class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateItem(item, factor) {
    item.quality -= item.sellIn <= 0 ? 2 * factor : 1 * factor;

    if (item.quality < 0) {
      item.quality = 0;
    }
    item.sellIn--;
  }

  updateAgedBrieQuality(item) {
    if (item.quality < 50) {
      item.quality += 1;
    }
    item.sellIn--;
  }

  updateBackstagePasses(pass) {
    if (pass.sellIn <= 0) {
      pass.quality = 0;
      pass.sellIn--;
      return;
    }
    if (pass.quality < 50) {
      pass.quality += 1;
      if (pass.sellIn <= 10) {
        pass.quality += 1;
      }
      if (pass.sellIn <= 5) {
        pass.quality += 1;
      }
    }
    if (pass.quality > 50) {
      pass.quality = 50;
    }
    pass.sellIn--;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      switch (this.items[i].name) {
        case "Aged Brie":
          this.updateAgedBrieQuality(this.items[i]);
          break;
        case "Sulfuras, Hand of Ragnaros":
          break;
        case "Backstage passes to a TAFKAL80ETC concert":
          this.updateBackstagePasses(this.items[i]);
          break;
        case "Conjured":
          this.updateItem(this.items[i], 2);
          break;
        default:
          this.updateItem(this.items[i], 1);
          break;
      }
    }
    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};
