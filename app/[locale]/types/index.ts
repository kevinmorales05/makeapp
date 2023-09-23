import { User, Product, Checkout } from "@prisma/client";

// export type SafeListing = Omit<Listing, "createdAt"> & {
//   createdAt: string;
// };

// export type SafeReservation = Omit<
//   Reservation,
//   "createdAt" | "startDate" | "endDate" | "listing"
// > & {
//   createdAt: string;
//   startDate: string;
//   endDate: string;
//   listing: SafeListing;
// };

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type SafeProducts = Omit<Product, "createdAt" | "updatedAt"> & {
  createdAt: Date;
  updatedAt: Date;
};

export type ExtendedProductCart = Product & {
  quantity: number
}

export type SafeCart = Omit<ExtendedProductCart, "createdAt" | "updatedAt"> & {
  createdAt: Date;
  updatedAt: Date;
};


export type Order = Omit<Checkout, "updatedAt"> & {
  updatedAt: Date;
}
