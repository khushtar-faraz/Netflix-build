import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setUserSubscription } from "../features/userSlice";
import db from "../firebase";
import "./PlansScreen.css";

function PlansScreen(props) {
  const [products, setProducts] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const user = useSelector((state) => state.userSlice.user);
  const dispatch = useDispatch();

  useEffect(() => {
    db.collection("customers")
      .doc(user.id)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start:
              subscription.data().current_period_start.seconds,
          });
        });
      });
  }, [user.id]);
  // console.log(subscription);

  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection("prices").get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        setProducts(products);
      });
  }, []);
  // console.log(products);

  const loadCheckout = async (priceId) => {
    const docRef = await db
      .collection("customers")
      .doc(user.id)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        alert(`An error occured:${error.message}`);
      }
      if (sessionId) {
        const stripe = await loadStripe(
          "pk_test_51KXiVISJXEQZFXR756JjkYVUdGDVn2CUuXZmEDEXYdsFLqkb5W02lVtly7KuvAUT9TAkFBzDC4QT2ubQ1L5CB5by00qqlnZClr"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };
  dispatch(setUserSubscription(subscription));

  return (
    <div className="plansScreen ">
      <br />
      {subscription && (
        <p>
          Renewal Date:{" "}
          {new Date(
            subscription.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPlan = productData.name
          ?.toLowerCase()
          .includes(subscription?.role.toLowerCase());
        return (
          <div
            className={`${
              isCurrentPlan && "planScreen_plan--disabled"
            } planScreen_plan`}
            key={productId}
          >
            <div className="planScreen_info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
              onClick={() =>
                !isCurrentPlan && loadCheckout(productData.prices.priceId)
              }
            >
              {!isCurrentPlan ? "Subscribe" : "Current Package"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlansScreen;
