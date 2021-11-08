const { Shop, Item } = require("../src/gilded_rose");

describe("Gilded Rose", function () {
  //Normal Items
  it("should update normal Item quality with sellIn positive", function () {
    const normalItem = new Item("normal", 10, 30);
    const shop = new Shop([normalItem]);
    const updatedItems = shop.updateQuality();
    expect(updatedItems[0].quality).toBe(29);
    expect(updatedItems[0].sellIn).toBe(9);
  });

  it("should update normal Item quality with sellIn negative", function () {
    const normalItem = new Item("normal", -2, 30);
    const shop = new Shop([normalItem]);
    const updatedItems = shop.updateQuality();
    expect(updatedItems[0].quality).toBe(28);
    expect(updatedItems[0].sellIn).toBe(-3);
  });

  it("should not update normal Item quality with sellIn positive (quality <= 0)", function () {
    const normalItem = new Item("normal", 10, 0);
    const shop = new Shop([normalItem]);
    const updatedItems = shop.updateQuality();
    expect(updatedItems[0].quality).toBe(0);
    expect(updatedItems[0].sellIn).toBe(9);
  });

  //Aged Brie
  it("should update 'Aged Brie' quality", function () {
    const agedBrie = new Item("Aged Brie", 10, 30);
    const shop = new Shop([agedBrie]);
    const updatedItems = shop.updateQuality();
    expect(updatedItems[0].quality).toBe(31);
    expect(updatedItems[0].sellIn).toBe(9);
  });

  it("should not update 'Aged Brie' quality (>=50)", function () {
    const agedBrie = new Item("Aged Brie", 10, 50);
    const shop = new Shop([agedBrie]);
    const updatedItems = shop.updateQuality();
    expect(updatedItems[0].quality).toBe(50);
    expect(updatedItems[0].sellIn).toBe(9);
  });

  //Sulfuras
  it("should not update 'Sulfuras' item ", function () {
    const sulfuras = new Item("Sulfuras, Hand of Ragnaros", 10, 80);
    const shop = new Shop([sulfuras]);
    const updatedItems = shop.updateQuality();
    expect(updatedItems[0].quality).toBe(80);
    expect(updatedItems[0].sellIn).toBe(10);
  });

  //Backstage passes
  it("should  update 'Backstage passes' sellIn > 10 ", function () {
    const backstagePasses = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      15,
      30
    );
    const shop = new Shop([backstagePasses]);
    const updatedItems = shop.updateQuality();
    expect(updatedItems[0].quality).toBe(31);
    expect(updatedItems[0].sellIn).toBe(14);
  });

  it("should  update 'Backstage passes'  5 < sellIn < 10 ", function () {
    const backstagePasses = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      8,
      30
    );
    const shop = new Shop([backstagePasses]);
    const updatedItems = shop.updateQuality();
    expect(updatedItems[0].quality).toBe(32);
    expect(updatedItems[0].sellIn).toBe(7);
  });

  it("should  update 'Backstage passes'  0 < sellIn < 5 ", function () {
    const backstagePasses = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      4,
      30
    );
    const shop = new Shop([backstagePasses]);
    const updatedItems = shop.updateQuality();
    expect(updatedItems[0].quality).toBe(33);
    expect(updatedItems[0].sellIn).toBe(3);
  });
  it("should update 'Backstage passes'  sellIn reaching 0 ", function () {
    const backstagePasses = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      0,
      30
    );
    const shop = new Shop([backstagePasses]);
    const updatedItems = shop.updateQuality();
    expect(updatedItems[0].quality).toBe(0);
    expect(updatedItems[0].sellIn).toBe(-1);
  });
  it("should not update 'Backstage passes' quality equals 50 ", function () {
    const backstagePasses = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      2,
      50
    );
    const shop = new Shop([backstagePasses]);
    const updatedItems = shop.updateQuality();
    expect(updatedItems[0].quality).toBe(50);
    expect(updatedItems[0].sellIn).toBe(1);
  });
  it("should not update 'Backstage passes' quality will be > 50 ", function () {
    const backstagePasses = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      2,
      48
    );
    const shop = new Shop([backstagePasses]);
    const updatedItems = shop.updateQuality();
    expect(updatedItems[0].quality).toBe(50);
    expect(updatedItems[0].sellIn).toBe(1);
  });

  //Conjured Items
  it("should update 'Conjured item' ", function () {
    const backstagePasses = new Item("Conjured", 3, 6);
    const shop = new Shop([backstagePasses]);
    const updatedItems = shop.updateQuality();
    expect(updatedItems[0].quality).toBe(4);
    expect(updatedItems[0].sellIn).toBe(2);
  });

  //Should update multiple Items
  it("should update multiple items", function () {
    const normal = new Item("+5 Dexterity Vest", 10, 20);
    const agedBrie = new Item("Aged Brie", 2, 0);
    const pass = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49);
    const conjured = new Item("Conjured", 3, 6);

    const shop = new Shop([normal, agedBrie, pass, conjured]);
    const updatedItems = shop.updateQuality();
    expect(updatedItems[0].quality).toBe(19);
    expect(updatedItems[1].quality).toBe(1);
    expect(updatedItems[2].quality).toBe(50);
    expect(updatedItems[3].quality).toBe(4);
  });
});
