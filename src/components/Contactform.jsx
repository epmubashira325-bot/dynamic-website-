function ContactForm() {
  return (
    <form className="space-y-6">

      <input
        type="text"
        placeholder="Full Name"
        className="w-full border p-4 rounded-lg"
      />

      <input
        type="email"
        placeholder="Email"
        className="w-full border p-4 rounded-lg"
      />

      <input
        type="tel"
        placeholder="Phone Number"
        className="w-full border p-4 rounded-lg"
      />

      <textarea
        rows="6"
        placeholder="Your Message"
        className="w-full border p-4 rounded-lg"
      ></textarea>

      <button
        className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-4 rounded-lg"
      >
        Send Message
      </button>

    </form>
  );
}

export default ContactForm;