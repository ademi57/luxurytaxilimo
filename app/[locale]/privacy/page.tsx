import Header from "../../components/header";

export default function PrivacyPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0B0F14",
        color: "#FAFAFA",
        paddingTop: "140px",
        paddingBottom: "60px",
      }}
    >
      <div style={{ maxWidth: "850px", margin: "0 auto", padding: "0 20px" }}>
        
        <h1 style={{ fontSize: "34px", marginBottom: "10px" }}>
          Privacyverklaring (AVG / GDPR)
        </h1>

        <p style={{ opacity: 0.7, marginBottom: "30px" }}>
          Laatst bijgewerkt: 29 mei 2026
        </p>

        <h3 style={{ color: "#C6A26B", marginTop: "20px" }}>1. Algemeen</h3>
        <p>
          Wij hechten grote waarde aan de bescherming van uw persoonsgegevens
          en verwerken deze in overeenstemming met de Algemene Verordening
          Gegevensbescherming (AVG / GDPR).
        </p>

        <h3 style={{ color: "#C6A26B", marginTop: "25px" }}>
          2. Welke gegevens wij verzamelen
        </h3>
        <p>
          Wij kunnen de volgende gegevens verzamelen wanneer u een boeking
          of aanvraag indient:
        </p>
        <ul>
          <li>Naam en contactgegevens (e-mail)</li>
          <li>Boekingsdetails (datum, tijd, locatie)</li>
          <li>Passagiersinformatie</li>
        </ul>

        <h3 style={{ color: "#C6A26B", marginTop: "25px" }}>
          3. Doel van gegevensverwerking
        </h3>
        <p>
          Uw gegevens worden uitsluitend gebruikt voor:
        </p>
        <ul>
          <li>Het verwerken van boekingsaanvragen</li>
          <li>Communicatie over uw reservering</li>
          <li>Het leveren van onze transport- en tourovereenkomsten</li>
        </ul>

        <h3 style={{ color: "#C6A26B", marginTop: "25px" }}>
          4. Rechtsgrond (AVG artikel 6)
        </h3>
        <p>
          Wij verwerken persoonsgegevens op basis van:
        </p>
        <ul>
          <li>Uitvoering van een overeenkomst</li>
          <li>Toestemming van de gebruiker</li>
          <li>Wettelijke verplichtingen (indien van toepassing)</li>
        </ul>

        <h3 style={{ color: "#C6A26B", marginTop: "25px" }}>
          5. Delen met derden
        </h3>
        <p>
          Wij delen uw gegevens alleen met noodzakelijke dienstverleners
          zoals e-mailproviders en hostingdiensten (bijv. Vercel) om onze
          website en diensten te laten functioneren.
        </p>

        <h3 style={{ color: "#C6A26B", marginTop: "25px" }}>
          6. Gegevensopslag
        </h3>
        <p>
          Gegevens worden niet langer bewaard dan noodzakelijk is voor het
          uitvoeren van de dienst of zolang wettelijk vereist is.
        </p>

        <h3 style={{ color: "#C6A26B", marginTop: "25px" }}>
          7. Uw rechten
        </h3>
        <p>U heeft recht op:</p>
        <ul>
          <li>Inzage in uw gegevens</li>
          <li>Correctie of verwijdering</li>
          <li>Beperking van verwerking</li>
          <li>Intrekking van toestemming</li>
        </ul>

        <h3 style={{ color: "#C6A26B", marginTop: "25px" }}>
          8. Cookies
        </h3>
        <p>
          Deze website kan functionele cookies gebruiken om de werking van
          de site te verbeteren. Er worden geen tracking cookies gebruikt
          zonder toestemming.
        </p>

        <h3 style={{ color: "#C6A26B", marginTop: "25px" }}>
          9. Contact
        </h3>
        <p>
          Voor vragen over privacy kunt u contact opnemen via:
          <br />
          <b>info@luxurytaxilimo.nl</b>
        </p>

        <h3 style={{ color: "#C6A26B", marginTop: "25px" }}>
          10. Klachten
        </h3>
        <p>
          U heeft het recht om een klacht in te dienen bij de Nederlandse
          toezichthouder:
          Autoriteit Persoonsgegevens (AP).
        </p>
      </div>
    </div>
  );
}