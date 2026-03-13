import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/seed", async (req, res) => {
  try {
    const products = [
      { name:"Outfitter Slim Fit Chinos", price:3499, category:"Men", brand:"Outfitter", description:"Modern slim fit chinos in premium stretch fabric.", image:"https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=300&fit=crop", countInStock:50 },
      { name:"Outfitter Oversized Hoodie", price:4299, category:"Men", brand:"Outfitter", description:"Ultra-soft fleece oversized hoodie with kangaroo pocket.", image:"https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&h=300&fit=crop", countInStock:40 },
      { name:"Outfitter Graphic Tee", price:1899, category:"Men", brand:"Outfitter", description:"100% combed cotton drop-shoulder tee.", image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop", countInStock:60 },
      { name:"Outfitter Cargo Joggers", price:4599, category:"Men", brand:"Outfitter", description:"Utility cargo joggers with multiple pockets.", image:"https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop", countInStock:35 },
      { name:"Outfitter Men's Polo Shirt", price:2499, category:"Men", brand:"Outfitter", description:"Premium pique cotton polo with embroidered logo.", image:"https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&h=300&fit=crop", countInStock:45 },
      { name:"Breakout Denim Jacket", price:6999, category:"Men", brand:"Breakout", description:"Classic denim jacket with distressed detailing.", image:"https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?w=400&h=300&fit=crop", countInStock:25 },
      { name:"Cougar Urban Runner", price:6999, category:"Men", brand:"Cougar", description:"Engineered mesh upper with responsive cushioning.", image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop", countInStock:30 },
      { name:"Cougar Oxford Leather Shoes", price:8499, category:"Men", brand:"Cougar", description:"Handcrafted leather oxford shoes with anti-slip sole.", image:"https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=400&h=300&fit=crop", countInStock:20 },
      { name:"Men's Stainless Steel Watch", price:8999, category:"Men", brand:"Breakout", description:"Elegant stainless steel watch with date display.", image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop", countInStock:15 },
      { name:"Men's Aviator Sunglasses", price:2799, category:"Men", brand:"Outfitter", description:"UV400 polarized aviator sunglasses.", image:"https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop", countInStock:50 },
      { name:"Men's Canvas Backpack", price:3999, category:"Men", brand:"Outfitter", description:"Durable canvas backpack with laptop compartment.", image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop", countInStock:30 },
      { name:"J. Junaid Jamshed Oud Perfume", price:5499, category:"Men", brand:"J. Junaid Jamshed", description:"Rich oud fragrance. Long-lasting oriental scent.", image:"https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=300&fit=crop", countInStock:40 },
      { name:"Men's Leather Bifold Wallet", price:1999, category:"Men", brand:"Cougar", description:"Slim genuine leather wallet with RFID blocking.", image:"https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=300&fit=crop", countInStock:55 },
      { name:"Sapphire Men's Linen Kurta", price:4299, category:"Men", brand:"Sapphire", description:"Elegant linen kurta with subtle embroidery.", image:"https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=400&h=300&fit=crop", countInStock:30 },
      { name:"Men's Slim Fit Jeans", price:4499, category:"Men", brand:"Breakout", description:"Dark wash slim fit jeans with stretch fabric.", image:"https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop", countInStock:40 },
      { name:"Khaadi Embroidered Lawn Kurta", price:3299, category:"Women", brand:"Khaadi", description:"Intricately embroidered lawn kurta.", image:"https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=300&fit=crop", countInStock:40 },
      { name:"Khaadi Khaddar Winter Suit", price:5499, category:"Women", brand:"Khaadi", description:"Warm khaddar 3-piece suit with contrast embroidery.", image:"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=300&fit=crop", countInStock:30 },
      { name:"Sapphire Premium Linen Suit", price:9999, category:"Women", brand:"Sapphire", description:"Luxurious linen 3-piece suit with fine embroidery.", image:"https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop", countInStock:20 },
      { name:"Gul Ahmed Summer Lawn Set", price:3199, category:"Women", brand:"Gul Ahmed", description:"Vibrant summer lawn 3-piece printed set.", image:"https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=300&fit=crop", countInStock:50 },
      { name:"Maria B Luxury Chiffon Suit", price:7499, category:"Women", brand:"Maria B", description:"Signature chiffon suit with intricate embroidery.", image:"https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400&h=300&fit=crop", countInStock:25 },
      { name:"Breakout Women's Hoodie", price:3999, category:"Women", brand:"Breakout", description:"Cozy women's hoodie with soft fleece lining.", image:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=300&fit=crop", countInStock:35 },
      { name:"Unze Embellished Wedding Heels", price:4999, category:"Women", brand:"Unze", description:"Handcrafted embellished heels.", image:"https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=300&fit=crop", countInStock:20 },
      { name:"Stylo Pointed Toe Pumps", price:4299, category:"Women", brand:"Stylo", description:"Elegant pointed toe pumps with block heel.", image:"https://images.unsplash.com/photo-1518049362265-d5b2a6467637?w=400&h=300&fit=crop", countInStock:30 },
      { name:"Women's Floral Tote Bag", price:3499, category:"Women", brand:"Khaadi", description:"Spacious canvas tote bag with floral print.", image:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop", countInStock:40 },
      { name:"Women's Gold Hoop Earrings", price:1499, category:"Women", brand:"Sapphire", description:"Lightweight gold-plated hoop earrings.", image:"https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=300&fit=crop", countInStock:60 },
      { name:"Alkaram Festive Suit", price:8499, category:"Women", brand:"Alkaram", description:"Luxurious festive 3-piece suit with heavy embroidery.", image:"https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=400&h=300&fit=crop", countInStock:20 },
      { name:"Bonanza Satrangi Shawl", price:3499, category:"Women", brand:"Bonanza", description:"Luxurious printed winter shawl.", image:"https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=300&fit=crop", countInStock:40 },
      { name:"Boys Graphic Tee", price:999, category:"Boys", brand:"Outfitter", description:"Fun graphic printed tee.", image:"https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&h=300&fit=crop", countInStock:60 },
      { name:"Boys Denim Jeans", price:2299, category:"Boys", brand:"Breakout", description:"Classic slim fit denim jeans for boys.", image:"https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=300&fit=crop", countInStock:45 },
      { name:"Boys Hoodie Sweatshirt", price:2499, category:"Boys", brand:"Outfitter", description:"Warm fleece hoodie with front pocket.", image:"https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=400&h=300&fit=crop", countInStock:50 },
      { name:"Boys Sports Sneakers", price:2999, category:"Boys", brand:"Bata", description:"Lightweight sneakers with velcro strap.", image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop", countInStock:40 },
      { name:"Boys School Backpack", price:1999, category:"Boys", brand:"Local Brand", description:"Spacious school backpack.", image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop", countInStock:55 },
      { name:"Boys Winter Jacket", price:3999, category:"Boys", brand:"Breakout", description:"Warm padded jacket with zip closure and hood.", image:"https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&h=300&fit=crop", countInStock:25 },
      { name:"Boys Tracksuit Set", price:2799, category:"Boys", brand:"Outfitter", description:"Comfortable tracksuit for sports and casual wear.", image:"https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=400&h=300&fit=crop", countInStock:35 },
      { name:"Boys Digital Watch", price:1299, category:"Boys", brand:"Local Brand", description:"Colorful digital watch with alarm.", image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop", countInStock:50 },
      { name:"Girls Floral Frock", price:1999, category:"Girls", brand:"Khaadi", description:"Beautiful floral printed frock.", image:"https://images.unsplash.com/photo-1518831959646-742c3a14ebf6?w=400&h=300&fit=crop", countInStock:45 },
      { name:"Girls Embroidered Frock", price:2799, category:"Girls", brand:"Sapphire", description:"Intricately embroidered frock.", image:"https://images.unsplash.com/photo-1476234251651-f353703a034d?w=400&h=300&fit=crop", countInStock:30 },
      { name:"Girls Unicorn Hoodie", price:2299, category:"Girls", brand:"Outfitter", description:"Adorable unicorn hoodie with soft fleece.", image:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=300&fit=crop", countInStock:40 },
      { name:"Girls Ballet Flats", price:1799, category:"Girls", brand:"Bata", description:"Cute ballet flats with ribbon detail.", image:"https://images.unsplash.com/photo-1518049362265-d5b2a6467637?w=400&h=300&fit=crop", countInStock:50 },
      { name:"Girls School Backpack", price:1999, category:"Girls", brand:"Local Brand", description:"Pink butterfly printed school bag.", image:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop", countInStock:40 },
      { name:"Girls Hair Accessories Set", price:699, category:"Girls", brand:"Ideas", description:"Set of clips, scrunchies and headbands.", image:"https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop", countInStock:70 },
      { name:"Girls Party Dress", price:3499, category:"Girls", brand:"Sapphire", description:"Gorgeous tulle party dress.", image:"https://images.unsplash.com/photo-1476234251651-f353703a034d?w=400&h=300&fit=crop", countInStock:25 },
      { name:"Girls Eid Special Gharara", price:4999, category:"Girls", brand:"Maria B", description:"Festive embroidered gharara set.", image:"https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=400&h=300&fit=crop", countInStock:20 },
      { name:"Girls Winter Coat", price:3999, category:"Girls", brand:"Breakout", description:"Warm padded coat with fur-trim hood.", image:"https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&h=300&fit=crop", countInStock:25 },
      { name:"Girls Sparkle Sneakers", price:2299, category:"Girls", brand:"Bata", description:"Glittery sneakers kids love!", image:"https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=300&fit=crop", countInStock:35 },
    ];
    await Product.deleteMany({});
    await Product.insertMany(products);
    res.json({ success: true, message: `✅ ${products.length} products seeded!` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
