import { useState } from 'react'
import { SlideHeading } from './shared'

const products = [
  { name: 'Wireless Keyboard', qty: 2, price: 39.9 },
  { name: 'USB-C Hub', qty: 1, price: 54.5 },
  { name: 'Laptop Stand', qty: 1, price: 42 },
]
export default function InvoiceLetterFax() {
  const [vat, setVat] = useState(21)
  const subtotal = products.reduce((sum, product) => sum + product.qty * product.price, 0)
  return (
    <div className="content-slide">
      <SlideHeading eyebrow="02 / SPREADSHEETS" title="A spreadsheet can run a business" subtitle="Invoices calculate totals; business letters and faxes keep the communication clear." />
      <div className="invoice-demo">
        <div className="invoice-paper"><div className="invoice-brand"><span className="market-mark">M</span><div><strong>MEDIA MARKET</strong><small>TECHNOLOGY FOR EVERY DAY</small></div><span className="invoice-label">INVOICE</span></div><div className="invoice-meta"><div><small>BILL TO</small><strong>Northstar Studio</strong><span>18 Market Street, Dublin</span></div><div><small>INVOICE NO.</small><strong>MM-2026-041</strong><span>28 September 2026</span></div></div><div className="invoice-table"><div className="invoice-head"><span>DESCRIPTION</span><span>QTY</span><span>PRICE</span><span>AMOUNT</span></div>{products.map((item) => <div className="invoice-row" key={item.name}><span>{item.name}</span><span>{item.qty}</span><span>€{item.price.toFixed(2)}</span><strong>€{(item.qty * item.price).toFixed(2)}</strong></div>)}</div><div className="invoice-bottom"><div className="invoice-message"><strong>Thank you for your business!</strong><span>Payment due within 30 days.</span><small>Questions? accounts@mediamarket.example</small></div><div className="invoice-totals"><span>Subtotal <strong>€{subtotal.toFixed(2)}</strong></span><label>VAT <select value={vat} onChange={(event) => setVat(Number(event.target.value))}><option value="21">21%</option><option value="10">10%</option><option value="0">0%</option></select><strong>€{(subtotal * vat / 100).toFixed(2)}</strong></label><span className="invoice-total">TOTAL <strong>€{(subtotal * (1 + vat / 100)).toFixed(2)}</strong></span></div></div><div className="invoice-footer">MEDIA MARKET · DUBLIN · VAT IE1234567A</div></div>
        <aside className="invoice-explainer"><span className="invoice-step">01</span><strong>Enter items</strong><p>Quantity × price gives each line amount.</p><span className="invoice-step">02</span><strong>Calculate VAT</strong><p>Choose the rate; the tax updates automatically.</p><span className="invoice-step">03</span><strong>Communicate</strong><p>Add a clear letter or fax cover note with the invoice.</p></aside>
      </div>
    </div>
  )
}
