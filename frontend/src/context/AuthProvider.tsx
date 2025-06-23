import { onAuthStateChanged, User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { AuthContext } from "./AuthContext";
import { IonContent, IonPage, IonSpinner } from "@ionic/react";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading)
    return (
      <IonPage>
        <IonContent>
          <div className="container">
            <IonSpinner name="crescent"></IonSpinner>
          </div>
        </IonContent>
      </IonPage>
    );

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
