# 18 Unique Test Cases

| Tool | ID | Test | What it verifies |
|------|-----|------|------------------|
| **Selenium** | SL-01 | Navbar + landing form | BUS TICKETS link, search inputs |
| | SL-02 | Bus search | Lucknow → Delhi navigation |
| | SL-03 | Select bus header | Route header text |
| | SL-04 | Invalid route modal | Mumbai → Pune shows routes table |
| | SL-05 | Bus hire nav | Navbar → /bus-hire |
| | SL-06 | 404 page | Unknown URL error page |
| **Cypress** | CY-01 | Bus search | Lucknow → **Allahabad** (different route) |
| | CY-02 | Bus list | API loads buses on select-bus |
| | CY-03 | Hire form | Fill form → quotations page |
| | CY-04 | Hire details | Vehicle details + Trip Summary |
| | CY-05 | Profile tab | Hired Bus section |
| | CY-06 | Profile tab | My Profile contact details |
| **JMeter** | JM-01 | GET /routes | All routes list |
| | JM-02 | GET /routes/Lucknow/**Faizabad** | Route search (unique cities) |
| | JM-03 | POST /customers | Create customer |
| | JM-04 | GET /busservice | List hire vehicles |
| | JM-05 | GET /busservice/{id} | Single vehicle details |
| | JM-06 | POST /bookingHire | Create hire booking |

No overlap between the three tools — **18 unique tests total**.
