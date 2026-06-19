import React from "react";
import styles from "./Services.module.css";
import { v4 as uuidv4 } from "uuid";
const data = [
  {
    img: "/local/placeholder.svg",
    title: "SAFETY+",
    desc:
      "With Safety+ we have brought in a set of measures like Sanitized buses, mandatory masks etc. to ensure you travel safely.",
  },
  {
    img:
      "/local/placeholder.svg",
    title: "SUPERIOR CUSTOMER SERVICE",
    desc:
      "We put our experience and relationships to good use and are available to solve your travel issues. ",
  },
  {
    img:
      "/local/placeholder.svg",
    title: "LOWEST PRICES",
    desc:
      "We always give you the lowest price with the best partner offers. And be Poceket friendly for your upcoming trips",
  },
  {
    img:
      "/local/placeholder.svg",
    title: "UNMATCHED BENEFITS",
    desc:
      "We take care of your travel beyond ticketing by providing you with innovative and unique benefits.",
  },
];

const Services = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.imgBox}>
        <img
          src="/local/placeholder.svg"
          alt=""
        />
      </div>
      <h1>We promise to deliver</h1>
      <div className={styles.flexContainer}>
        {data.map((item) => {
          return (
            <div key={uuidv4()} className={styles.flexItems}>
              <div className={styles.itemimg}>
                <img src={item.img} alt="item" />
              </div>

              <p>{item.title}</p>
              <p className={styles.desc}>{item.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
