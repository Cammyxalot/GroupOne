import { GildedRose, Item } from '../src';

describe('Item class', () => {
  it('should create an instance of Item', () => {
    const item = new Item('Sample Item', 5, 10);
    expect(item).toBeInstanceOf(Item);
    expect(item.name).toBe('Sample Item');
    expect(item.sellIn).toBe(5);
    expect(item.quality).toBe(10);
  });
});

describe('GildedRose class', () => {
  it('should create an instance of GildedRose with items', () => {
    const items = [new Item('Item 1', 5, 10), new Item('Item 2', 10, 20)];
    const gildedRose = new GildedRose(items);

    expect(gildedRose).toBeInstanceOf(GildedRose);
    expect(gildedRose.items).toHaveLength(2);
  });

  it('should create an instance of GildedRose without items', () => {
    const gildedRose = new GildedRose();

    expect(gildedRose).toBeInstanceOf(GildedRose);
    expect(gildedRose.items).toHaveLength(0);
  });

  it('should decrease quality by 1 for normal items', () => {
    // Arrange
    const SELL_IN = 5;
    const QUALITY = 10;

    // Act
    const gildedRose = new GildedRose([new Item('Item 1', SELL_IN, QUALITY)]);
    gildedRose.updateQuality();

    // Assert
    expect(gildedRose.items[0].quality).toBe(QUALITY - 1);
    expect(gildedRose.items[0].sellIn).toBe(SELL_IN - 1);
  });

  // "- Once the sell by date has passed, Quality degrades twice as fast"
  it('should decrease quality by twice as fast after sell by date', () => {
    // Arrange
    const SELL_IN = 0;
    const QUALITY = 10;

    // Act
    const gildedRose = new GildedRose([new Item('Item 1', SELL_IN, QUALITY)]);
    gildedRose.updateQuality();

    // Assert
    expect(gildedRose.items[0].quality).toBe(QUALITY - 2);
    expect(gildedRose.items[0].sellIn).toBe(SELL_IN - 1);
  });

  // "- The Quality of an item is never negative"
  it('should not decrease quality below 0', () => {
    // Arrange
    const SELL_IN = 5;
    const QUALITY = 0;

    // Act
    const gildedRose = new GildedRose([new Item('Item 1', SELL_IN, QUALITY)]);
    gildedRose.updateQuality();

    // Assert
    expect(gildedRose.items[0].quality).toBe(0);
    expect(gildedRose.items[0].sellIn).toBe(SELL_IN - 1);
  });

  // "- "Aged Brie" actually increases in Quality the older it gets"
  it('should increase quality by 1 for Aged Brie', () => {
    // Arrange
    const SELL_IN = 5;
    const QUALITY = 10;

    // Act
    const gildedRose = new GildedRose([new Item('Aged Brie', SELL_IN, QUALITY)]);
    gildedRose.updateQuality();

    expect(gildedRose.items[0].quality).toBe(QUALITY + 1);
  });

  // "- The Quality of an item is never more than 50"
  it('should not increase quality above 50', () => {
    // Arrange
    const SELL_IN = 5;
    const QUALITY = 50;

    // Act
    const gildedRose = new GildedRose([new Item('Aged Brie', SELL_IN, QUALITY)]);
    gildedRose.updateQuality();

    // Assert
    expect(gildedRose.items[0].quality).toBe(QUALITY);
  });

  // "- "Sulfuras", being a legendary item, never has to be sold or decreases in Quality"
  it('should not decrease quality and sellIn for Sulfuras', () => {
    // Arrange
    const SELL_IN = 5;
    const QUALITY = 10;

    // Act
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', SELL_IN, QUALITY)]);
    gildedRose.updateQuality();

    // Assert
    expect(gildedRose.items[0].quality).toBe(QUALITY);
    expect(gildedRose.items[0].sellIn).toBe(SELL_IN);
  });

  it('should increase quality by 1 for Backstage passes when sellIn > 10', () => {
    // Arrange
    const SELL_IN = 11;
    const QUALITY = 10;

    // Act
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', SELL_IN, QUALITY)]);
    gildedRose.updateQuality();

    // Assert
    expect(gildedRose.items[0].quality).toBe(QUALITY + 1);
    expect(gildedRose.items[0].sellIn).toBe(SELL_IN - 1);
  });

  // "- "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
  // Quality increases by 2 when there are 10 days"
  it('should increase quality by 2 for Backstage passes when sellIn <= 10', () => {
    // Arrange
    const SELL_IN = 10;
    const QUALITY = 10;

    // Act
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', SELL_IN, QUALITY)]);
    gildedRose.updateQuality();

    // Assert
    expect(gildedRose.items[0].quality).toBe(QUALITY + 2);
    expect(gildedRose.items[0].sellIn).toBe(SELL_IN - 1);
  });

  // "- "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
  // Quality increases by 3 when there are 5 days"
  it('should increase quality by 3 for Backstage passes when sellIn <= 5', () => {
    // Arrange
    const SELL_IN = 5;
    const QUALITY = 10;

    // Act
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', SELL_IN, QUALITY)]);
    gildedRose.updateQuality();

    // Assert
    expect(gildedRose.items[0].quality).toBe(QUALITY + 3);
    expect(gildedRose.items[0].sellIn).toBe(SELL_IN - 1);
  });

  // "- "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
  // Quality drops to 0 after the concert"
  it('should drop quality to 0 for Backstage passes when sellIn <= 0', () => {
    // Arrange
    const SELL_IN = 0;
    const QUALITY = 10;

    // Act
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', SELL_IN, QUALITY)]);
    gildedRose.updateQuality();

    // Assert
    expect(gildedRose.items[0].quality).toBe(0);
    expect(gildedRose.items[0].sellIn).toBe(SELL_IN - 1);
  });
});
