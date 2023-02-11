import React, { useRef, useEffect } from "react";
import API from '../api/API';
import { useHistory, Redirect } from 'react-router-dom';

export default function Paypal({ trans_id, price }) {
  const paypal = useRef();
  const history = useHistory();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Payment Paypal",
                amount: {
                  currency_code: "USD",
                  value: price,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          API.payWithPaypal({ trans_id, orderId: order.id })
            .then((res) => {
              const status = res.data.status;
              if (status === 200) {
                console.log(res.data);
                let url = res.data.data.url;
                history.push(url);
              } else {
                history.push(`/`);
              }
            }).catch((err) => {
              console.log(err);
            })
        },
        onError: (err) => {
          console.log(err);
          history.push(`/`);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}