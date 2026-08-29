export interface WPProductFields {
  model?: string;
  engine?: string;
  bucketCapacity?: string;
  operatingWeight?: string;
  dischargeHeight?: string;
  ratedPower?: string;
  liftingCapacity?: string;
  ironingCapacity?: string;
  powerType?: string[];
  loIPin?: string;
  shortDescription?: string;
  isNew?: boolean;
  isFeatured?: boolean;
  productGallery?: { node: { sourceUrl: string } };
  nh2?: { node: { sourceUrl: string } };
  nh3?: { node: { sourceUrl: string } };
}

export interface WPProduct {
  id: string;
  slug: string;
  title: string;
  content?: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
    };
  };
  productFields?: WPProductFields;
  productCategories?: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
}
