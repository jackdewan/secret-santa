export type Profile =
  | {
      created_at: string;
      email: string | null;
      exclude: string[] | null;
      wish_list: string[] | null;
      match: string | null;
      user_id: string;
      user_name: string | null;
    }
  | undefined;
