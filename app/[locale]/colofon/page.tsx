export default function ColofonPage() {
  return (
    // 'pt-40' (veya 140px) Header'ın arkada kalmamasını sağlar.
    // 'layout.tsx' içerisindeki Header fixed olduğu için bu boşluk şart.
    <div style={{ minHeight: "100vh", backgroundColor: "#0A0A0A", color: "#FAFAFA"}}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "32px", marginBottom: "30px", color: "#D4AF37" }}>Colofon</h1>
        <p>Informatie conform de wettelijke verplichtingen (Duitsland/Nederland):</p>
        <h3 style={{ marginTop: "20px" }}>Bedrijfsnaam</h3>
        <p>Luxury Taxi Limo</p>
        <h3 style={{ marginTop: "20px" }}>Contact</h3>
        <p>Email: info@luxurytaxilimo.com</p>
        <p>Tel: +31 6 55508424</p>
        <h1>Colofon (Bedrijfsgegevens)</h1>
      <p>Informatie conform de wettelijke verplichtingen:</p>
      
      <h3>Bedrijfsnaam</h3>
      <p>Taxibedrijf Uyar</p>
      
      <h3>Adres</h3>
      <p>Oost-Dorsch 125</p>
      <p>1504BN Zaandam</p>
      <p>Nederland</p>
      
      <h3>Contact</h3>
      <p>E-mail: info@luxurytaxilimo.com</p>
      <p>Telefoon: +31 6 38352022</p>
      
      <h3>Registratie</h3>
      <p>KVK-nummer (KvK): 34156787</p>
      <p>BTW-identificatienummer: 8438293</p>
      </div>
    </div>
  );
}