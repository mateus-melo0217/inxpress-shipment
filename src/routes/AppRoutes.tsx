import { Routes, Route } from "react-router-dom";
import {Overview} from "pages/overview/Overview";
import {Faq} from "pages/faq/Faq";
import {FreightHistory} from "pages/freight_history/FreightHistory";
import {GetPricing} from "pages/get_pricing/GetPricing";
import {Reports} from "pages/reports/Reports";
import {Tools} from "pages/tools/Tools";
import {SavedQuotes} from "pages/saved_quotes/SavedQuotes";
import {Quotes} from "pages/quotes/Quotes";
import {ShipmentsImporter} from "pages/shipments_importer/ShipmentsImporter";
import {QuoteRequest} from "pages/direct_quote/QuoteRequest";
import {QuoteRequestHistory} from "pages/direct_quote_history/QuoteRequestHistory";

/*
 * Here is where you can register routes for the application
 */
export const AppRoutes = () => {
    return (
        <Routes>
            {/* default route */}
            <Route path='/' element={<Overview/>} />

            {/* routes */}
            <Route path='overview' element={<Overview/>} />
            <Route path='freight_history' element={<FreightHistory/>} />
            <Route path='get_pricing'>
                <Route path='' element={<GetPricing />} />
                <Route path='shipment/:dataId' element={<GetPricing />} />
                <Route path='quote/:dataId' element={<GetPricing />} />
            </Route>
            <Route path='saved_quotes' element={<SavedQuotes/>} />

            {/* rate aggregator routes */}
            <Route path='rate_aggregator'>
                <Route path='' element={<Overview />} />
                <Route path='quotes' element={<Quotes />} />
                <Route path='shipments_importer' element={<ShipmentsImporter />} />
            </Route>

            {/* freight lite routes */}
            <Route path='freight_lite'>
                <Route path='' element={<Overview />} />
                <Route path='direct_quote' element={<QuoteRequest />} />
                <Route path='direct_quote_history' element={<QuoteRequestHistory />} />
            </Route>

            {/* other routes */}
            <Route path='reports' element={<Reports/>} />
            <Route path='tools' element={<Tools/>} />
            <Route path='faq' element={<Faq/>} />
        </Routes>
    )
}