"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import type { Borrow } from "@/lib/types";
import { useAuthUser } from "@/lib/useAuthUser";

type Ctx = { ids: Set<string>; reload: () => Promise<void> };

const BorrowedContext = createContext<Ctx>({ ids: new Set(), reload: async () => {} });


export function BorrowedProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuthUser();
  const email = user?.email;
  const [ids, setIds] = useState<Set<string>>(new Set());

  const reload = useCallback(async () => {
    if (!email) return;
    try {
      const list = await api<Borrow[]>("/borrows", { auth: true });
      setIds(new Set(list.map((b) => b.bookId)));
    } catch {
      
    }
  }, [email]);

  useEffect(() => {
    if (!email) return;
    api<Borrow[]>("/borrows", { auth: true })
      .then((list) => setIds(new Set(list.map((b) => b.bookId))))
      .catch(() => {});
  }, [email]);

  
  const value = useMemo(() => ({ ids: email ? ids : new Set<string>(), reload }), [email, ids, reload]);
  return <BorrowedContext.Provider value={value}>{children}</BorrowedContext.Provider>;
}

export const useBorrowed = () => useContext(BorrowedContext);
