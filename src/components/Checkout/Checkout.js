import React from "react";
import { useAuth } from "../../Providers/AuthProvider";

function Checkout() {
  const auth = useAuth();
  return (
    <div>
      {auth ? (
        <>
          <p>name : {auth.name}</p>
          <p>email : {auth.email}</p>
          <p>tel : {auth.phoneNumber}</p>
        </>
      ) : (
        <>please log in</>
      )}
    </div>
  );
}

export default Checkout;
