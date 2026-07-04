// What's included / not included for each pricing card.
// Keyed by the exact service name as shown in Pricing.jsx / the
// admin-managed services list. Matching is case-insensitive and
// trims whitespace (see getServiceDetails in Pricing.jsx), so this
// works whether the price list comes from the fallback data or the
// backend /api/services data.
const serviceDetails = {
  "Bathroom Cleaning": {
    included: [
      "Toilet seat cleaning (inside & outside)",
      "Sink, tiles, taps & other fixtures",
      "Mirrors, windows & glass partition",
      "Exhaust fan & other hard-to-reach areas",
      "Scrubbing & deep cleaning",
      "Removal of hard water, cement & rust stains",
      "Cabinet interiors",
    ],
    notIncluded: [
      "Dismantling & cleaning of appliances",
      "Buckets, mugs & stools",
    ],
  },

  "Kitchen Deep Cleaning": {
    included: [
      "Ceiling & fan dusting",
      "Gas stove / hob cleaning",
      "Switchboard & fixtures cleaning",
      "Trolley & cabinet dismantling",
      "Sink & under-the-sink cleaning",
      "Cabinet interior & exterior",
      "Kitchen slab, floor & tiles cleaning",
      "Windows, exhaust fan & fan dusting",
    ],
    notIncluded: [
      "Any repair or electrician-related work",
      "Hob/stove inner section (needs pull-out)",
      "Item removal & replacement",
    ],
  },

  "Chimney Cleaning": {
    included: [
      "Dismantling (unlocking & removing filters)",
      "Filter cleaning (chemical spray + scrubbing)",
      "Chimney exterior cleaning (stain removal)",
      "Wet wiping of all surfaces",
      "Reassembling filters & parts",
      "Cleaning of automatic/sensor chimneys",
      "Cleaning of chimney motor",
    ],
    notIncluded: [
      "Any repair or electrician-related work",
      "Interior dust/carbon filter dismantling & cleaning",
    ],
  },

  "Kitchen Chimney Deep Cleaning": {
    included: [
      "Dismantling (unlocking & removing filters)",
      "Filter cleaning (chemical spray + scrubbing)",
      "Chimney exterior cleaning (stain removal)",
      "Wet wiping of all surfaces",
      "Reassembling filters & parts",
      "Cleaning of automatic/sensor chimneys",
      "Cleaning of chimney motor",
    ],
    notIncluded: [
      "Any repair or electrician-related work",
      "Interior dust/carbon filter dismantling & cleaning",
    ],
  },

  "Fridge Cleaning": {
    included: [
      "Interior cleaning (spills, stains & odor removal)",
      "Exterior cleaning (grease & oil stains)",
    ],
    notIncluded: [
      "Removing items from the fridge before cleaning",
      "Placing items back after cleaning",
      "Appliance repair",
      "Any electrician-related work",
    ],
  },

  "Fan Cleaning": {
    included: [
      "Dry dusting (dust, dirt & debris removal)",
      "Stain removal using cleaning solution",
      "Final wet wiping with microfiber cloth",
    ],
    notIncluded: [
      "Any repair or electrician-related work",
      "Fans with fixed screws won't be dismantled (to avoid damage)",
    ],
  },

  "Exhaust Fan Cleaning": {
    included: [
      "Dry dusting (dust, dirt & debris removal)",
      "Stain removal using cleaning solution",
      "Final wet wiping with microfiber cloth",
    ],
    notIncluded: [
      "Any repair or electrician-related work",
      "Fans with fixed screws won't be dismantled (to avoid damage)",
    ],
  },

  "Kitchen Sink Cleaning": {
    included: [
      "Deep cleaning of sink & top (food stains, oil, grime)",
      "Under-the-sink scrubbing",
    ],
    notIncluded: [
      "Scrubbing machine cleaning",
      "Rust stains",
      "Internal cleaning of sink pipes",
    ],
  },

  "Gas Stove Cleaning": {
    included: [
      "Stove top cleaning (stain & spot removal)",
      "Burner cleaning",
      "Knob cleaning",
    ],
    notIncluded: [
      "Appliance repair",
      "Any electrician-related work",
      "Hob/stove inner section",
    ],
  },

  "Sofa Cleaning": {
    included: [
      "Dry vacuuming (dust, dirt & debris removal)",
      "Foam-based chemical deep cleaning (fabric sofas only)",
      "Wet vacuuming (shampoo & water removal)",
      "Drying under fan for 4-5 hours",
    ],
    notIncluded: [
      "Ink stain removal",
      "Stains fully absorbed into the surface may not be removable",
    ],
  },

  "Carpet Cleaning": {
    included: [
      "Dry vacuuming (dust, dirt & debris removal)",
      "Chemical application & machine scrubbing",
      "Wet vacuuming (shampoo & water removal)",
      "Drying for 4-5 hours under fan",
    ],
    notIncluded: [
      "Complete removal of ink stains",
      "Deeply absorbed ink stains may not be fully removable",
    ],
  },

  "Mattress Cleaning": {
    included: [
      "Dry vacuuming (dust, dirt & debris removal)",
      "Chemical application & machine scrubbing",
      "Wet vacuuming (shampoo & water removal)",
      "Drying for 4-5 hours under fan",
    ],
    notIncluded: [
      "Complete removal of ink stains",
      "Deeply absorbed ink stains may not be fully removable",
    ],
  },

  "Dining Table & Chair Cleaning": {
    included: [
      "Dry dusting (dust, dirt & debris removal)",
      "Wet wiping of table surface (stains & spots)",
      "Chair shampooing - fabric chairs (tough stains & spillage)",
    ],
    notIncluded: [
      "Ink stain removal",
      "Paint stains may not be completely removable",
    ],
  },

  "Glass Cleaning": {
    included: [
      "Dry dusting (dust, dirt & debris removal)",
      "Stain & spot removal using cleaning solution",
      "Final wet wiping with microfiber cloth",
    ],
    notIncluded: [],
  },

  "Wash Basin Cleaning": {
    included: [
      "Wet wiping to remove loose dust & dirt",
      "Chemical application & soft brush scrubbing",
      "Final drying with clean microfiber cloth",
    ],
    notIncluded: [
      "Rust stains on taps may not be fully removable",
      "Worn-off chrome coating/surface finish cannot be restored",
    ],
  },

  "Water Tank Cleaning": {
    included: [
      "Tank inspection",
      "Complete water drainage",
      "Removal of sludge, algae & dirt",
      "Scrubbing of walls, floor & corners",
      "High-pressure water jet cleaning",
      "Final rinse with clean water",
      "Final inspection & job completion",
    ],
    notIncluded: [
      "Any plumbing, motor or pipeline repair work",
      "Cement, paint or permanent rust stains",
      "Pre-existing cracks or leakages in the tank",
      "Deep stains absorbed into the surface",
      "Refilling the tank after cleaning",
      "Any electrical or civil work",
    ],
  },

  "Windows Cleaning": {
    included: [
      "Dry dusting (dust, dirt & debris removal)",
      "Stain & spot removal using cleaning solution",
      "Final wet wiping with microfiber cloth",
    ],
    notIncluded: [],
  },
};

export default serviceDetails;
