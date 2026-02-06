import React from "react";

const Home = () => {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Mirë se Vini në CarePlus</h1>
      <p>Sistemi i Menaxhimit të Shëndetësisë</p>
      <div style={{ marginTop: "30px" }}>
        <p>Përdorni menunë anash për të qasur:</p>
        <ul style={{ textAlign: "left", display: "inline-block" }}>
          <li>Menaxhimin e Pacientëve</li>
          <li>Menaxhimin e Doktorëve</li>
          <li>Menaxhimin e Takimeve</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
