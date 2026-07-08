import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function TermsPage() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-[#111827] text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="uppercase tracking-[6px] text-amber-500 text-sm mb-4">
            Legal
          </p>

          <h1 className="text-5xl md:text-6xl font-bold">
            Terms & Conditions
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-6">

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">

            <div className="space-y-8 text-gray-700 leading-9 text-[17px]">

              <p>
                This website is owned and operated by Amarnath Associates.
                Your use of this website is an acknowledgement that you have
                read and understood the terms and conditions that apply
                herewith. No materials from this site may be copied,
                reproduced, modified, republished, transmitted, or
                distributed without prior written permission from
                Amarnath Associates.
              </p>

              <p>
                By accessing any of the site content or services, you agree
                you are bound by this agreement, as it may be amended or
                supplemented from time to time, and agree to all operating
                rules that may be published by Amarnath Associates on the
                site.
              </p>

              <p>
                There may be links and resources from other websites which
                are purely for information purposes. However, Amarnath
                Associates does not endorse any of the sites linked to it
                nor does it guarantee the quality or credibility of the
                additional resources provided on the site.
              </p>

              <p>
                Amarnath Associates has the right to revise and otherwise
                modify this agreement at any point of time and the modified
                agreement will be published for your perusal. Use of the
                site following the revision indicates your acceptance of
                all such revised terms.
              </p>

              <p>
                Amarnath Associates has the right to modify or discontinue,
                temporarily or permanently, the services, and/or to refuse
                or restrict anyone from access to any of the services, with
                or without notice and in its sole discretion. Amarnath
                Associates shall not be liable for any modification,
                suspension or discontinuance of any services.
              </p>

              <p className="font-semibold uppercase text-gray-900">
                YOUR USE OF THIS SITE AND SERVICES IS AT YOUR SOLE RISK.
                THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE"
                BASIS, WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED.
              </p>

              <p className="font-semibold uppercase text-gray-900">
                AMARNATH ASSOCIATES WILL NOT BE LIABLE FOR ANY DIRECT,
                INDIRECT, INCIDENTAL, SPECIAL, PUNITIVE, CONSEQUENTIAL OR
                EXEMPLARY DAMAGES ARISING OUT OF OR IN ANY WAY RELATED TO
                THIS AGREEMENT OR THE USE OF THE SERVICES, INCLUDING,
                WITHOUT LIMITATION, DAMAGES FOR LOSS OF PROFITS,
                GOODWILL, USE, DATA OR OTHER INTANGIBLE LOSSES.
              </p>

              <p>
                If you have any problems or enquiries related to our
                services, please feel free to contact us.
              </p>

            </div>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default TermsPage;