import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function PrivacyPage() {
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
            Privacy Policy
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-6">

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">

            <div className="space-y-8 text-gray-700 leading-9 text-[17px]">

              <p>
                The matter of safeguarding your privacy is taken seriously at
                <strong> Amarnath Associates</strong>. The information we collect
                from our guests and website visitors is used by Amarnath
                Associates to understand and serve their needs. The information
                that can be used to identify you as an individual is referred to
                here as <strong>"Personal Information"</strong>. It can include,
                but is not limited to, your name, address, email ID, phone
                number, and other relevant details. The Personal Information that
                we collect is used to assist us in making your reservation,
                providing you with the services you request, meeting your project
                objectives and other requirements, and allowing us to contact you
                regarding matters related to our services.
              </p>

              <p>
                When you use our website, we collect and store the personal
                information provided by you. Our primary goal in doing so is to
                provide a safe, efficient, smooth, and customized experience.
                This allows us to offer services and features that best meet your
                needs and to customize our website to make your experience easier
                and more secure. Importantly, we collect only the personal
                information that we consider necessary for achieving these
                purposes.
              </p>

              <p>
                In general, you can browse our website without revealing your
                identity or providing any personal information. Once you provide
                your personal information, however, you are no longer anonymous
                to us. Wherever possible, we indicate which fields are mandatory
                and which are optional. You always have the choice not to provide
                information by deciding not to use a particular service or
                feature available on our website.
              </p>

              <p>
                You agree that we may use your personal information to improve
                our marketing and promotional efforts, analyze website usage,
                enhance the content and services we provide, and customize the
                website's content, layout, and functionality. These activities
                help us improve the overall user experience and ensure that our
                website better serves your needs in a safe, efficient, and
                personalized manner.
              </p>

              <p>
                You also agree that we may use your personal information to
                contact you and provide information that may be relevant to your
                interests. This may include administrative notices, service
                updates, promotional communications, product or service
                offerings, targeted advertisements, and other information related
                to your interaction with our website. By accepting this Privacy
                Policy, you expressly consent to receiving such communications
                from Amarnath Associates.
              </p>

            </div>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default PrivacyPage;