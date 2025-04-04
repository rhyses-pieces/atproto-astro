declare namespace App {
  interface Locals {
    user: {
      id: string;
      handle: string;
    },
    session: {
      sid: string;
      userDid: string;
    },
  }
}