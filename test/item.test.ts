import { Item } from "../src";

describe('Item class', () => {
  it('should create an instance of Item', () => {
    const item = new Item('Sample Item', 5, 10);
    expect(item).toBeInstanceOf(Item);
    expect(item.name).toBe('Sample Item');
    expect(item.sellIn).toBe(5);
    expect(item.quality).toBe(10);
  });
});
