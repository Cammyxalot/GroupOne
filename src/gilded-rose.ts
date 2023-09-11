import { Item } from "./item";

export class GildedRose {
  constructor(public items = new Array<Item>) {
  }

  updateQuality() {
    for (const item of this.items) {
      this.updateItem(item);
    }

    return this.items;
  }

  updateItem(item: Item) {
    const specificItems = [
      ['Aged Brie', this.updateAgeBrie],
      ['Backstage passes to a TAFKAL80ETC concert', this.updateBackstagePasses],
      ['Sulfuras, Hand of Ragnaros', this.updateSulfuras],
    ] as const;

    for (const [name, update] of specificItems) {
      if (item.name == name) {
        update(item);
        return;
      }
    }

    this.updateNormal(item);
  }

  updateNormal(item: Item) {
    if (item.sellIn <= 0) {
      item.quality = item.quality - 2;
    } else if (item.quality > 0) {
      item.quality = item.quality - 1;
    }

    item.sellIn = item.sellIn - 1;
  }

  updateAgeBrie(item: Item) {
    if (item.quality < 50) {
      item.quality = item.quality + 1;
    }

    item.sellIn = item.sellIn - 1;
  }

  updateBackstagePasses(item: Item) {
    if (item.sellIn <= 5) {
      item.quality = item.quality + 3;
    } else if (item.sellIn <= 10) {
      item.quality = item.quality + 2;
    } else {
      item.quality = item.quality + 1;
    }

    item.sellIn = item.sellIn - 1;

    if (item.sellIn < 0) {
      item.quality = 0;
    }
  }

  updateSulfuras(item: Item) {
    // Do nothing
  }
}
