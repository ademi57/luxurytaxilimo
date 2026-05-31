import Header from "../../components/header";
export default function PrivacyPage() {
  return (
    <div style={{ 
  minHeight: "100vh", 
  backgroundColor: "#0A0A0A", 
  color: "#FAFAFA", 
  paddingTop: "140px", // Buradaki padding-top Header'ın altında kalmamanı sağlar
  paddingBottom: "40px" 
}}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>Privacyverklaring</h1>
        <p>Laatst bijgewerkt: 29 mei 2026</p>

        <h3 style={{ marginTop: "30px", color: "#D4AF37" }}>1. Algemeen</h3>
        <p>Wij hechten grote waarde aan de bescherming van uw persoonsgegevens.</p>

        <h3 style={{ marginTop: "30px", color: "#D4AF37" }}>2. Uw rechten</h3>
        <p>U heeft het recht om uw gegevens in te zien, te corrigeren of te laten verwijderen.</p>
        <h1>Privacyverklaring</h1>
        <p>Laatst bijgewerkt: 29 mei 2026</p>

        <h3>1. Algemeen</h3>
        <p>Wij hechten grote waarde aan de bescherming van uw persoonsgegevens in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG).</p>

        <h3>2. Verzameling van gegevens</h3>
       <p>Wij verzamelen alleen gegevens die noodzakelijk zijn voor het uitvoeren van uw boekingsaanvraag (zoals naam, e-mailadres en reisdetails).</p>

        <h3>3. Doel van verwerking</h3>
        <p>Uw gegevens worden uitsluitend gebruikt om onze diensten (luxe taxi, tours, transfers) te kunnen leveren en om met u te communiceren.</p>

        <h3>4. Delen met derden</h3>
        <p>Wij delen uw gegevens niet met derden, tenzij dit noodzakelijk is voor de uitvoering van de overeenkomst.</p>

        <h3>5. Uw rechten</h3>
        <p>U heeft het recht om uw gegevens in te zien, te corrigeren of te laten verwijderen. Neem hiervoor contact met ons op via [Email Adresin].</p>
        </div>
    </div>
  );
}