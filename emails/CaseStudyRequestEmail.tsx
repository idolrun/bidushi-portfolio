import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "react-email";

export const CASE_STUDY_EMAIL_SUBJECT = "Your Case Study Request — Bidushi / YKSH";

const BLACKLETTER = "Ghosthey, 'Old English Text MT', 'UnifrakturCook', Georgia, serif";
const SANS = "'Space Grotesk', 'Helvetica Neue', Helvetica, Arial, sans-serif";

export default function CaseStudyRequestEmail() {
  return (
    <Html lang="en">
      <Head />
      <Preview>Your request has been received.</Preview>
      <Body style={{ margin: 0, padding: "40px 12px", backgroundColor: "#090909" }}>
        <Container style={{ maxWidth: 520, margin: "0 auto" }}>
          <Section style={{ backgroundColor: "#FDF5F2", borderTop: "4px solid #0BD40B" }}>
            <Section style={{ padding: "48px 32px 44px", textAlign: "center" }}>
              <Text
                style={{
                  margin: 0,
                  fontFamily: SANS,
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#0E0E10",
                  letterSpacing: "-0.02em",
                }}
              >
                <span
                  style={{
                    fontFamily: BLACKLETTER,
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: 22,
                  }}
                >
                  B
                </span>{" "}
                / YKSH
              </Text>

              <Text
                style={{
                  margin: "40px 0 0",
                  fontFamily: SANS,
                  fontSize: 40,
                  lineHeight: "44px",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  textTransform: "uppercase",
                  color: "#0E0E10",
                }}
              >
                <span
                  style={{
                    fontFamily: BLACKLETTER,
                    fontStyle: "italic",
                    fontWeight: 400,
                  }}
                >
                  T
                </span>
                HANK YOU
              </Text>

              <Text
                style={{
                  margin: "24px 0 0",
                  fontFamily: SANS,
                  fontSize: 15,
                  lineHeight: "24px",
                  color: "#0E0E10",
                }}
              >
                Your request has been received.
                <br />
                I’ll send the case study PDF to this email shortly.
              </Text>

              <Text
                style={{
                  margin: "32px 0 0",
                  fontFamily: SANS,
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#0E0E10",
                }}
              >
                — Bidushi
              </Text>

              <Text style={{ margin: "40px 0 0", fontFamily: SANS, fontSize: 12 }}>
                <Link
                  href="https://bidushi.design"
                  style={{ color: "#0E0E10", textDecoration: "underline" }}
                >
                  bidushi.design
                </Link>
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
