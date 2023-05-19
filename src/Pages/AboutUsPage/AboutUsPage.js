import React, { useEffect, useState } from "react";
import Title from "../../Components/Title/Title";
import "./AboutUsPage.css";
import ContinueShopping from "../../Components/Buttons/ContinueShopping";

export default function AboutUsPage() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);
  return (
    <main className="about-page container">
      <h1 className="text-center my-5 fw-bold display-5">Über uns</h1>
      <Title content={"UNSERE GESCHICHTE"} />
      <section className="history p-2">
        <div className="row history-row">
          <div className="col-lg-8 col-12 d-flex flex-column justify-content-between">
            <p className="history-text pt-2 w-100">
              Willkommen in unserem Online-Shop! Wir sind ein
              Familienunternehmen mit Sitz in [Stadt], und es liegt uns am
              Herzen, unseren Kunden höchste Qualität zu bieten Produkte und
              außergewöhnlicher Service. Unsere Geschichte begann im [Jahr], als
              wir eine Marktlücke für [Produktkategorie] bemerkten. Wir sahen
              eine Chance, unseren Kunden eine bessere und erschwinglichere
              Option zu bieten. und wir beschlossen, den Schritt zu wagen und
              unser eigenes Unternehmen zu gründen.
            </p>
            <div className="d-flex flex-column align-items-start justify-content-center w-100">
              <div className="history-divider"></div>
              <div className="history-divider"></div>
              <div className="history-divider"></div>
              <div className="history-divider"></div>
            </div>
          </div>
          <div className="col-lg-4 col-12">
            <img
              src="https://res.cloudinary.com/dvjvlobqp/image/upload/v1684502112/Saafran/logos%20and%20icons/znby2wijekw4hqizo5vh.png"
              alt="flower image"
              className="img-fluid history-img"
            />
          </div>
        </div>
        <p className="history-text mt-4">
          Heute sind wir stolz darauf, eine breite Palette von
          [Produktkategorie]-Produkten anbieten zu können, von [Produkttyp] bis
          [Produkttyp]. Wir erweitern ständig unser Angebot Auswahl, um den
          Bedürfnissen unserer Kunden gerecht zu werden, und wir sind immer auf
          der Suche nach neuen und innovativen Produkten, die wir unserem
          Bestand hinzufügen können.
        </p>
      </section>
      <Title content={"UNSERE MISSIONEN"} />
      <section className="mission">
        <div className="row mission-row">
          <div className="col-lg-7 col-12 d-flex align-items-center justify-content-start">
            <p className="mission-text p-2 ps-4 fw-bold">
              Im Kern sind wir von unserer Mission angetrieben, etwas zu bieten
              unseren Kunden das bestmögliche Erlebnis zu bieten. Wir glauben,
              dass Einkaufen einfach und unterhaltsam sein sollte. und
              stressfrei, und wir sind bestrebt, dies zu erreichen Das ist eine
              Realität für jeden Einzelnen von uns Kunden.
            </p>
          </div>
          <div className="col-lg-5 col-12">
            <img
              src="https://res.cloudinary.com/dvjvlobqp/image/upload/v1684503458/Saafran/logos%20and%20icons/bwmuavrb0rpjefoctuxb.png"
              alt="mission image"
              className="img-fluid mission-img"
            />
          </div>
        </div>
      </section>
      <Title content={"TRIFF DAS TEAM"} />
      <section className="team">
        <div className="row d-flex justify-content-md-evenly justify-content-center">
          <div className="col-md-3 col-10 mb-md-0 mb-5 team-person">
            <img
              className="team-person-img img-fluid"
              src="https://res.cloudinary.com/dvjvlobqp/image/upload/v1684504157/Saafran/logos%20and%20icons/gvn3dincdhbinmuh9bvh.png"
              alt="team memeber image"
            />
            <div className="team-person-info mt-3 text-center">
              <h5 className="fw-bold">VOLLSTÄNDIGER NAME</h5>
              <h6 className="fw-bold">POSITION</h6>
            </div>
          </div>
          <div className="col-md-3 col-10 mb-md-0 mb-5 team-person">
            <img
              className="team-person-img img-fluid"
              src="https://res.cloudinary.com/dvjvlobqp/image/upload/v1684504128/Saafran/logos%20and%20icons/cpb3gwdpk8gamesrir3s.png"
              alt="team memeber image"
            />
            <div className="team-person-info mt-3 text-center">
              <h5 className="fw-bold">VOLLSTÄNDIGER NAME</h5>
              <h6 className="fw-bold">POSITION</h6>
            </div>
          </div>
          <div className="col-md-3 col-10 team-person">
            <img
              className="team-person-img img-fluid"
              src="https://res.cloudinary.com/dvjvlobqp/image/upload/v1684504102/Saafran/logos%20and%20icons/dqf4ki5vmjttvtmhycut.png"
              alt="team memeber image"
            />
            <div className="team-person-info mt-3 text-center">
              <h5 className="fw-bold">VOLLSTÄNDIGER NAME</h5>
              <h6 className="fw-bold">POSITION</h6>
            </div>
          </div>
        </div>
        <p className="fw-bold fs-4 text-center mt-5">
          Unser Team besteht aus erfahrenen Fachleuten, die sich für Ihre
          Zufriedenheit einsetzen
        </p>
      </section>
      <ContinueShopping
        size={
          width > 992
            ? "smallButton"
            : width < 992 && width > 576
            ? "mediumButton"
            : "largeButton"
        }
      />
    </main>
  );
}
