import { redirect } from "next/navigation"

export default function RFQIndexPage() {
  // Redirect to the Create RFQ page for now
  // Later, this page will be an RFQ List Table showing all active RFQs
  redirect("/rfqs/new")
}
