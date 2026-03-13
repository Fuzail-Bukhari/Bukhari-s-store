import { useState, useEffect } from "react";
import ProductCard from "../components/product/ProductCard";

const fallbackProducts = [
  {_id:"m1",  name:"Outfitter Slim Fit Chinos",       price:3499, category:"Men", brand:"Outfitter",         description:"Modern slim fit chinos in premium stretch fabric.", image:"https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=300&fit=crop"},
  {_id:"m2",  name:"Outfitter Oversized Hoodie",      price:4299, category:"Men", brand:"Outfitter",         description:"Ultra-soft fleece oversized hoodie with kangaroo pocket.", image:"https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&h=300&fit=crop"},
  {_id:"m3",  name:"Outfitter Graphic Tee",           price:1899, category:"Men", brand:"Outfitter",         description:"100% combed cotton drop-shoulder tee.", image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop"},
  {_id:"m4",  name:"Outfitter Cargo Joggers",         price:4599, category:"Men", brand:"Outfitter",         description:"Utility cargo joggers with multiple pockets.", image:"https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop"},
  {_id:"m5",  name:"Outfitter Men's Polo Shirt",      price:2499, category:"Men", brand:"Outfitter",         description:"Premium pique cotton polo with embroidered logo.", image:"https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&h=300&fit=crop"},
  {_id:"m6",  name:"Breakout Denim Jacket",           price:6999, category:"Men", brand:"Breakout",          description:"Classic denim jacket with distressed detailing.", image:"https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?w=400&h=300&fit=crop"},
  {_id:"m7",  name:"Bonanza Men's Wool Sweater",      price:5499, category:"Men", brand:"Bonanza",           description:"Thick wool blend sweater with ribbed cuffs.", image:"https://images.unsplash.com/photo-1638643391904-9b551ba91eaa?w=400&h=300&fit=crop"},
  {_id:"m8",  name:"Sapphire Men's Linen Kurta",      price:4299, category:"Men", brand:"Sapphire",          description:"Elegant linen kurta with subtle embroidery.", image:"https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=400&h=300&fit=crop"},
  {_id:"m9",  name:"Cougar Urban Runner",             price:6999, category:"Men", brand:"Cougar",            description:"Engineered mesh upper with responsive cushioning.", image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop"},
  {_id:"m10", name:"Cougar Oxford Leather Shoes",     price:8499, category:"Men", brand:"Cougar",            description:"Handcrafted leather oxford shoes.", image:"https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=400&h=300&fit=crop"},
  {_id:"m11", name:"Cougar Suede Loafers",            price:7299, category:"Men", brand:"Cougar",            description:"Premium suede slip-on loafers.", image:"https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400&h=300&fit=crop"},
  {_id:"m12", name:"Cougar High Top Sneakers",        price:7999, category:"Men", brand:"Cougar",            description:"Bold high-top sneakers with padded ankle collar.", image:"https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=300&fit=crop"},
  {_id:"m13", name:"Men's Stainless Steel Watch",     price:8999, category:"Men", brand:"Breakout",          description:"Elegant stainless steel watch with date display.", image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop"},
  {_id:"m14", name:"Men's Aviator Sunglasses",        price:2799, category:"Men", brand:"Outfitter",         description:"UV400 polarized aviator sunglasses.", image:"https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop"},
  {_id:"m15", name:"Men's Canvas Backpack",           price:3999, category:"Men", brand:"Outfitter",         description:"Durable canvas backpack with laptop compartment.", image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop"},
  {_id:"m16", name:"J. Junaid Jamshed Oud Perfume",  price:5499, category:"Men", brand:"J. Junaid Jamshed", description:"Rich oud fragrance. Long-lasting oriental scent.", image:"https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=300&fit=crop"},
  {_id:"m17", name:"Men's Leather Bifold Wallet",     price:1999, category:"Men", brand:"Cougar",            description:"Slim genuine leather wallet with RFID blocking.", image:"https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=300&fit=crop"},
  {_id:"m18", name:"Men's Leather Belt",              price:1799, category:"Men", brand:"Cougar",            description:"Genuine leather dress belt.", image:"https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400&h=300&fit=crop"},
  {_id:"m19", name:"Men's Formal Dress Shirt",        price:3299, category:"Men", brand:"Sapphire",          description:"Crisp cotton formal shirt.", image:"https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=400&h=300&fit=crop"},
  {_id:"m20", name:"Outfitter Shorts",                price:2199, category:"Men", brand:"Outfitter",         description:"Comfortable cotton shorts with elastic waist.", image:"https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=400&h=300&fit=crop"},
  {_id:"m21", name:"Men's Shalwar Kameez",            price:3799, category:"Men", brand:"Gul Ahmed",         description:"Classic white shalwar kameez in soft cotton.", image:"https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop"},
  {_id:"m22", name:"Men's Sports Cap",                price:999,  category:"Men", brand:"Outfitter",         description:"Adjustable sports cap with UV protection.", image:"https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=300&fit=crop"},
  {_id:"m23", name:"Men's Slim Fit Jeans",            price:4499, category:"Men", brand:"Breakout",          description:"Dark wash slim fit jeans.", image:"https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop"},
  {_id:"m24", name:"Men's Running Tracksuit",         price:5999, category:"Men", brand:"Outfitter",         description:"Lightweight tracksuit for gym.", image:"https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=400&h=300&fit=crop"},
  {_id:"m25", name:"Men's Leather Chelsea Boots",     price:9499, category:"Men", brand:"Cougar",            description:"Premium leather Chelsea boots.", image:"https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=400&h=300&fit=crop"},
  {_id:"w1",  name:"Khaadi Embroidered Lawn Kurta",   price:3299, category:"Women", brand:"Khaadi",            description:"Intricately embroidered lawn kurta.", image:"https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=300&fit=crop"},
  {_id:"w2",  name:"Khaadi Khaddar Winter Suit",      price:5499, category:"Women", brand:"Khaadi",            description:"Warm khaddar 3-piece suit.", image:"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=300&fit=crop"},
  {_id:"w3",  name:"Sapphire Premium Linen Suit",     price:9999, category:"Women", brand:"Sapphire",          description:"Luxurious linen 3-piece suit.", image:"https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop"},
  {_id:"w4",  name:"Sapphire Pret Printed Shirt",     price:3799, category:"Women", brand:"Sapphire",          description:"Ready-to-wear printed pret shirt.", image:"https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=300&fit=crop"},
  {_id:"w5",  name:"Gul Ahmed Summer Lawn Set",       price:3199, category:"Women", brand:"Gul Ahmed",         description:"Vibrant summer lawn 3-piece set.", image:"https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=300&fit=crop"},
  {_id:"w6",  name:"Maria B Luxury Chiffon Suit",     price:7499, category:"Women", brand:"Maria B",           description:"Signature chiffon suit with embroidery.", image:"https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400&h=300&fit=crop"},
  {_id:"w7",  name:"Breakout Women's Hoodie",         price:3999, category:"Women", brand:"Breakout",          description:"Cozy women's hoodie with fleece lining.", image:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=300&fit=crop"},
  {_id:"w8",  name:"Outfitter Women's Joggers",       price:3299, category:"Women", brand:"Outfitter",         description:"Comfortable joggers with elastic waist.", image:"https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=300&fit=crop"},
  {_id:"w9",  name:"Alkaram Printed Lawn Dupatta",    price:1299, category:"Women", brand:"Alkaram",           description:"Beautifully printed lawn dupatta.", image:"https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=300&fit=crop"},
  {_id:"w10", name:"Bonanza Satrangi Shawl",          price:3499, category:"Women", brand:"Bonanza",           description:"Luxurious printed winter shawl.", image:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=300&fit=crop"},
  {_id:"w11", name:"Unze Embellished Wedding Heels",  price:4999, category:"Women", brand:"Unze",              description:"Handcrafted embellished heels.", image:"https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=300&fit=crop"},
  {_id:"w12", name:"Stylo Pointed Toe Pumps",         price:4299, category:"Women", brand:"Stylo",             description:"Elegant pointed toe pumps.", image:"https://images.unsplash.com/photo-1518049362265-d5b2a6467637?w=400&h=300&fit=crop"},
  {_id:"w13", name:"Bata Women's Comfort Sandals",    price:2299, category:"Women", brand:"Bata",              description:"Flat sandals with cushioned insole.", image:"https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=400&h=300&fit=crop"},
  {_id:"w14", name:"Women's Floral Tote Bag",         price:3499, category:"Women", brand:"Khaadi",            description:"Spacious canvas tote bag.", image:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop"},
  {_id:"w15", name:"Women's Gold Hoop Earrings",      price:1499, category:"Women", brand:"Sapphire",          description:"Lightweight gold-plated hoop earrings.", image:"https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=300&fit=crop"},
  {_id:"w16", name:"Women's Floral Perfume",          price:4299, category:"Women", brand:"J. Junaid Jamshed", description:"Light floral fragrance.", image:"https://images.unsplash.com/photo-1588776814546-1ffedbe74c80?w=400&h=300&fit=crop"},
  {_id:"w17", name:"Women's Pearl Necklace Set",      price:1999, category:"Women", brand:"Sapphire",          description:"Elegant faux pearl necklace set.", image:"https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop"},
  {_id:"w18", name:"Women's Wristlet Clutch",         price:2499, category:"Women", brand:"Stylo",             description:"Compact wristlet clutch.", image:"https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&h=300&fit=crop"},
  {_id:"w19", name:"Women's Silk Hair Scrunchies",    price:699,  category:"Women", brand:"Ideas",             description:"Set of 6 premium silk scrunchies.", image:"https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop"},
  {_id:"w20", name:"Khaadi Women's Abaya",            price:6499, category:"Women", brand:"Khaadi",            description:"Elegant embroidered abaya.", image:"https://images.unsplash.com/photo-1559163499-413811fb2344?w=400&h=300&fit=crop"},
  {_id:"w21", name:"Women's Casual Sneakers",         price:3999, category:"Women", brand:"Bata",              description:"Lightweight white sneakers.", image:"https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=300&fit=crop"},
  {_id:"w22", name:"Women's Crossbody Bag",           price:4299, category:"Women", brand:"Stylo",             description:"Chic leather crossbody bag.", image:"https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=300&fit=crop"},
  {_id:"w23", name:"Gul Ahmed Stitched Kurti",        price:2799, category:"Women", brand:"Gul Ahmed",         description:"Printed cotton kurti.", image:"https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=400&h=300&fit=crop"},
  {_id:"w24", name:"Women's Rose Gold Watch",         price:5999, category:"Women", brand:"Breakout",          description:"Elegant rose gold watch.", image:"https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=400&h=300&fit=crop"},
  {_id:"w25", name:"Alkaram Studio Festive Suit",     price:8499, category:"Women", brand:"Alkaram",           description:"Luxurious festive 3-piece suit.", image:"https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=400&h=300&fit=crop"},
  {_id:"b1",  name:"Boys Graphic Tee",                price:999,  category:"Boys", brand:"Outfitter",   description:"Fun graphic printed tee.", image:"https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&h=300&fit=crop"},
  {_id:"b2",  name:"Boys Denim Jeans",                price:2299, category:"Boys", brand:"Breakout",    description:"Classic slim fit denim jeans.", image:"https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=300&fit=crop"},
  {_id:"b3",  name:"Boys Hoodie Sweatshirt",          price:2499, category:"Boys", brand:"Outfitter",   description:"Warm fleece hoodie.", image:"https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=400&h=300&fit=crop"},
  {_id:"b4",  name:"Boys Sports Sneakers",            price:2999, category:"Boys", brand:"Bata",        description:"Lightweight sneakers.", image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop"},
  {_id:"b5",  name:"Boys School Backpack",            price:1999, category:"Boys", brand:"Local Brand", description:"Spacious school backpack.", image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop"},
  {_id:"b6",  name:"Boys Cargo Shorts",               price:1499, category:"Boys", brand:"Outfitter",   description:"Comfortable cargo shorts.", image:"https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=400&h=300&fit=crop"},
  {_id:"b7",  name:"Boys Eid Kurta Shalwar",          price:2799, category:"Boys", brand:"Gul Ahmed",   description:"Embroidered kurta shalwar.", image:"https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop"},
  {_id:"b8",  name:"Boys Polo T-Shirt",               price:1299, category:"Boys", brand:"Outfitter",   description:"Classic polo t-shirt.", image:"https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=400&h=300&fit=crop"},
  {_id:"b9",  name:"Boys Sports Cap",                 price:799,  category:"Boys", brand:"Outfitter",   description:"Adjustable sports cap.", image:"https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=300&fit=crop"},
  {_id:"b10", name:"Boys Winter Jacket",              price:3999, category:"Boys", brand:"Breakout",    description:"Warm padded jacket.", image:"https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&h=300&fit=crop"},
  {_id:"b11", name:"Boys Tracksuit Set",              price:2799, category:"Boys", brand:"Outfitter",   description:"Comfortable tracksuit.", image:"https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=400&h=300&fit=crop"},
  {_id:"b12", name:"Boys Casual Loafers",             price:1999, category:"Boys", brand:"Bata",        description:"Slip-on loafers.", image:"https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400&h=300&fit=crop"},
  {_id:"b13", name:"Boys Printed Pyjama Set",         price:1499, category:"Boys", brand:"Ideas",       description:"Soft cotton pyjama set.", image:"https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400&h=300&fit=crop"},
  {_id:"b14", name:"Boys Digital Watch",              price:1299, category:"Boys", brand:"Local Brand", description:"Digital watch with alarm.", image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop"},
  {_id:"b15", name:"Boys Superman T-Shirt",           price:1099, category:"Boys", brand:"Local Brand", description:"Superhero printed tee.", image:"https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=400&h=300&fit=crop"},
  {_id:"b16", name:"Boys Swim Shorts",                price:1299, category:"Boys", brand:"Outfitter",   description:"Quick-dry swim shorts.", image:"https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop"},
  {_id:"b17", name:"Boys Woolen Beanie",              price:699,  category:"Boys", brand:"Bonanza",     description:"Warm woolen beanie.", image:"https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=300&fit=crop"},
  {_id:"b18", name:"Boys Canvas Shoes",               price:1799, category:"Boys", brand:"Bata",        description:"Classic white canvas shoes.", image:"https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=300&fit=crop"},
  {_id:"b19", name:"Boys Denim Jacket",               price:2999, category:"Boys", brand:"Breakout",    description:"Mini denim jacket.", image:"https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?w=400&h=300&fit=crop"},
  {_id:"b20", name:"Boys Formal Waistcoat Set",       price:3499, category:"Boys", brand:"Sapphire",    description:"Elegant 3-piece formal set.", image:"https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=300&fit=crop"},
  {_id:"g1",  name:"Girls Floral Frock",              price:1999, category:"Girls", brand:"Khaadi",      description:"Beautiful floral printed frock.", image:"https://images.unsplash.com/photo-1518831959646-742c3a14ebf6?w=400&h=300&fit=crop"},
  {_id:"g2",  name:"Girls Embroidered Frock",         price:2799, category:"Girls", brand:"Sapphire",    description:"Embroidered frock for Eid.", image:"https://images.unsplash.com/photo-1476234251651-f353703a034d?w=400&h=300&fit=crop"},
  {_id:"g3",  name:"Girls Unicorn Hoodie",            price:2299, category:"Girls", brand:"Outfitter",   description:"Adorable unicorn hoodie.", image:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=300&fit=crop"},
  {_id:"g4",  name:"Girls Leggings Set",              price:1499, category:"Girls", brand:"Outfitter",   description:"Comfortable stretch leggings.", image:"https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=300&fit=crop"},
  {_id:"g5",  name:"Girls Ballet Flats",              price:1799, category:"Girls", brand:"Bata",        description:"Cute ballet flats.", image:"https://images.unsplash.com/photo-1518049362265-d5b2a6467637?w=400&h=300&fit=crop"},
  {_id:"g6",  name:"Girls School Backpack",           price:1999, category:"Girls", brand:"Local Brand", description:"Pink butterfly school bag.", image:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop"},
  {_id:"g7",  name:"Girls Hair Accessories Set",      price:699,  category:"Girls", brand:"Ideas",       description:"Clips, scrunchies and headbands.", image:"https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop"},
  {_id:"g8",  name:"Girls Kurta Shalwar",             price:2299, category:"Girls", brand:"Gul Ahmed",   description:"Printed lawn kurta shalwar.", image:"https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=300&fit=crop"},
  {_id:"g9",  name:"Girls Denim Jacket",              price:2799, category:"Girls", brand:"Breakout",    description:"Mini denim jacket with patches.", image:"https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?w=400&h=300&fit=crop"},
  {_id:"g10", name:"Girls Sparkle Sneakers",          price:2299, category:"Girls", brand:"Bata",        description:"Glittery sneakers.", image:"https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=300&fit=crop"},
  {_id:"g11", name:"Girls Winter Coat",               price:3999, category:"Girls", brand:"Breakout",    description:"Warm padded coat with fur-trim hood.", image:"https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&h=300&fit=crop"},
  {_id:"g12", name:"Girls Pyjama Set",                price:1299, category:"Girls", brand:"Ideas",       description:"Cotton pyjama set with animal prints.", image:"https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400&h=300&fit=crop"},
  {_id:"g13", name:"Girls Party Dress",               price:3499, category:"Girls", brand:"Sapphire",    description:"Tulle party dress with satin bow.", image:"https://images.unsplash.com/photo-1476234251651-f353703a034d?w=400&h=300&fit=crop"},
  {_id:"g14", name:"Girls Printed T-Shirt",           price:999,  category:"Girls", brand:"Outfitter",   description:"Cute printed t-shirt.", image:"https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&h=300&fit=crop"},
  {_id:"g15", name:"Girls Floral Sandals",            price:1499, category:"Girls", brand:"Stylo",       description:"Colorful floral strap sandals.", image:"https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=400&h=300&fit=crop"},
  {_id:"g16", name:"Girls Eid Special Gharara",       price:4999, category:"Girls", brand:"Maria B",     description:"Festive embroidered gharara.", image:"https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=400&h=300&fit=crop"},
  {_id:"g17", name:"Girls Waterproof Rain Jacket",    price:2999, category:"Girls", brand:"Local Brand", description:"Waterproof jacket with hood.", image:"https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=400&h=300&fit=crop"},
  {_id:"g18", name:"Girls Cartoon Lunch Box",         price:899,  category:"Girls", brand:"Local Brand", description:"Cartoon-printed insulated lunch box.", image:"https://images.unsplash.com/photo-1585837575652-267f2a7fc379?w=400&h=300&fit=crop"},
  {_id:"g19", name:"Girls Knit Cardigan",             price:2199, category:"Girls", brand:"Bonanza",     description:"Soft knit cardigan.", image:"https://images.unsplash.com/photo-1638643391904-9b551ba91eaa?w=400&h=300&fit=crop"},
  {_id:"g20", name:"Girls Pearl Hair Clips Set",      price:599,  category:"Girls", brand:"Ideas",       description:"Set of 12 pearl and bow hair clips.", image:"https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=300&fit=crop"},
];

const categories = ["All", "Men", "Women", "Boys", "Girls"];

const brands = [
  {name:"Outfitter"},{name:"Cougar"},{name:"Khaadi"},{name:"Sapphire"},
  {name:"Gul Ahmed"},{name:"Ideas"},{name:"J. Junaid Jamshed"},{name:"Breakout"},
  {name:"Maria B"},{name:"Stylo"},{name:"Bonanza"},{name:"Alkaram"},
  {name:"Unze"},{name:"Bata"},
];

export default function Home() {
  const [search, setSearch]               = useState("");
  const [category, setCategory]           = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [products, setProducts]           = useState([]);
  const [loading, setLoading]             = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/products`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setProducts(data);
        else setProducts(fallbackProducts);
        setLoading(false);
      })
      .catch(() => { setProducts(fallbackProducts); setLoading(false); });
  }, []);

  const filtered = products.filter(p => {
    const matchSearch   = p.name.toLowerCase().includes(search.toLowerCase()) ||
                          p.brand.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || p.category === category;
    const matchBrand    = selectedBrand === "All" || p.brand === selectedBrand;
    return matchSearch && matchCategory && matchBrand;
  });

  const clearAll   = () => { setSearch(""); setCategory("All"); setSelectedBrand("All"); };
  const hasFilters = search || category !== "All" || selectedBrand !== "All";
  const scrollTo   = () => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-white text-black">

      {/* HERO */}
      <div className="bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{backgroundImage:"linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize:"40px 40px"}}/>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 flex flex-col items-center text-center">
          <div className="border border-white/20 text-xs font-bold px-5 py-2 rounded-full uppercase tracking-widest mb-8 text-gray-400">
            🇵🇰 Pakistan's Premier Fashion Destination
          </div>
          <h1 className="text-7xl font-black mb-2 tracking-tight leading-none">BUKHARI'S</h1>
          <h2 className="text-7xl font-black mb-6 tracking-tight leading-none text-white/20">STORE</h2>
          <div className="w-16 h-px bg-white mb-8"/>
          <p className="text-gray-400 text-lg max-w-xl mb-10 leading-relaxed">
            Premium fashion for the whole family.<br/>
            <span className="text-white font-semibold">Men • Women • Boys • Girls</span>
          </p>
          <div className="flex gap-3 flex-wrap justify-center mb-14">
            <button onClick={scrollTo}
              className="bg-white text-black font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition-all hover:scale-105 shadow-lg">
              Shop Now →
            </button>
            {[{label:"👔 Men",cat:"Men"},{label:"👗 Women",cat:"Women"},{label:"👦 Boys",cat:"Boys"},{label:"👧 Girls",cat:"Girls"}].map(b => (
              <button key={b.cat}
                onClick={() => { setCategory(b.cat); setSelectedBrand("All"); scrollTo(); }}
                className="border border-white/25 text-white font-semibold px-5 py-3 rounded-full hover:bg-white/10 transition text-sm">
                {b.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl">
            {[{v:"14+",l:"Top Brands"},{v:"90+",l:"Products"},{v:"50K+",l:"Customers"},{v:"All PK",l:"Delivery"}].map(s => (
              <div key={s.l} className="border border-white/10 bg-white/5 rounded-2xl p-5 text-center">
                <p className="text-3xl font-black text-white">{s.v}</p>
                <p className="text-gray-500 text-xs mt-1 uppercase tracking-wider">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PROMO BAR */}
      <div className="bg-black border-y border-gray-800 text-white text-center py-3 px-4 text-xs font-semibold tracking-widest uppercase">
        🚚 Free Delivery above Rs. 5,000 &nbsp;|&nbsp; 🎁 Code
        <span className="bg-white text-black px-2 py-0.5 rounded font-black mx-1">BUKHARI10</span>
        for 10% off &nbsp;|&nbsp; ⚡ New arrivals weekly
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* CATEGORY CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
          {[
            {label:"Men's Fashion",    emoji:"👔", desc:"Clothing, Shoes & More",  cat:"Men"},
            {label:"Women's Fashion",  emoji:"👗", desc:"Eastern, Western & More", cat:"Women"},
            {label:"Boys Collection",  emoji:"👦", desc:"Clothing, Shoes & Bags",  cat:"Boys"},
            {label:"Girls Collection", emoji:"👧", desc:"Frocks, Shoes & Acc.",    cat:"Girls"},
          ].map((c, i) => (
            <button key={c.cat}
              onClick={() => { setCategory(c.cat); setSelectedBrand("All"); scrollTo(); }}
              className={`rounded-2xl p-6 text-left hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md border ${
                i % 2 === 0
                  ? "bg-black text-white border-black hover:bg-gray-900"
                  : "bg-white text-black border-gray-200 hover:border-black"
              }`}>
              <span className="text-4xl block mb-3">{c.emoji}</span>
              <h3 className="font-black text-base leading-tight">{c.label}</h3>
              <p className={`text-xs mt-1 ${i % 2 === 0 ? "text-gray-400" : "text-gray-500"}`}>{c.desc}</p>
            </button>
          ))}
        </div>

        {/* BRANDS */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-5 bg-black rounded-full"/>
            <h2 className="text-lg font-black text-black uppercase tracking-wider">Shop by Brand</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setSelectedBrand("All")}
              className={`px-4 py-2 rounded-full text-sm font-bold border-2 transition-all ${
                selectedBrand === "All"
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-600 border-gray-300 hover:border-black hover:text-black"
              }`}>
              All Brands
            </button>
            {brands.map(b => (
              <button key={b.name} onClick={() => setSelectedBrand(b.name)}
                className={`px-4 py-2 rounded-full text-sm font-bold border-2 transition-all ${
                  selectedBrand === b.name
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-600 border-gray-300 hover:border-black hover:text-black"
                }`}>
                {b.name}
              </button>
            ))}
          </div>
        </div>

        {/* CATEGORY TABS */}
        <div className="flex gap-2 flex-wrap mb-6">
          {categories.map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className={`px-5 py-2 rounded-full text-sm font-bold border-2 transition-all ${
                category === c
                  ? "bg-black text-white border-black shadow"
                  : "bg-white text-gray-600 border-gray-300 hover:border-black hover:text-black"
              }`}>
              {c === "All" ? "All" : c === "Men" ? "👔 Men" : c === "Women" ? "👗 Women" : c === "Boys" ? "👦 Boys" : "👧 Girls"}
            </button>
          ))}
        </div>

        {/* SEARCH */}
        <div className="relative mb-8">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
          <input type="text" placeholder="Search products or brands..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-12 pr-12 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-black shadow-sm text-gray-800 text-base transition-colors"/>
          {search && (
            <button onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black text-2xl font-bold">×</button>
          )}
        </div>

        {/* PRODUCTS HEADER */}
        <div id="products" className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black text-black">
              {selectedBrand !== "All" ? `${selectedBrand} Products`
                : category === "Men"   ? "👔 Men's Collection"
                : category === "Women" ? "👗 Women's Collection"
                : category === "Boys"  ? "👦 Boys' Collection"
                : category === "Girls" ? "👧 Girls' Collection"
                : "🛍️ All Products"}
            </h2>
            <p className="text-gray-400 text-sm mt-0.5">{filtered.length} items found</p>
          </div>
          {hasFilters && (
            <button onClick={clearAll}
              className="text-sm font-bold border-2 border-black text-black px-4 py-2 rounded-full hover:bg-black hover:text-white transition">
              Clear Filters ×
            </button>
          )}
        </div>

        {/* PRODUCTS GRID */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"/>
            <p className="text-gray-400 text-sm uppercase tracking-widest">Loading...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-7xl mb-4">😕</p>
            <p className="text-black text-xl font-black">No products found</p>
            <p className="text-gray-400 text-sm mt-2 mb-6">Try a different search or clear your filters</p>
            <button onClick={clearAll}
              className="bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition shadow-md">
              Show All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 pb-16">
            {filtered.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="bg-black text-white py-14 px-4 text-center">
        <h3 className="text-4xl font-black mb-1 tracking-tight">BUKHARI'S</h3>
        <p className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-6">Premium Pakistani Fashion</p>
        <div className="w-10 h-px bg-white/20 mx-auto mb-6"/>
        <div className="flex justify-center flex-wrap gap-8 text-gray-500 text-sm">
          <span>📞 0300-1234567</span>
          <span>📧 support@bukharistore.pk</span>
          <span>📍 Lahore, Pakistan</span>
        </div>
      </div>

    </div>
  );
}