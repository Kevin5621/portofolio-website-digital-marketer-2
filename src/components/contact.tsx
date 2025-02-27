export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-dark">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-display mb-6">Let&apos;s Connect</h2>
            <div className="h-1 w-24 bg-primary mb-8"></div>
            <p className="text-light/80 mb-8">
              Ready to boost your digital marketing strategy? Get in touch to discuss how we can work together to achieve your business goals.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="text-primary text-xl">📍</div>
                <div>Jakarta, Indonesia</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-primary text-xl">📱</div>
                <div>+62 812 3456 7890</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-primary text-xl">✉️</div>
                <div>hello@adharaeka.com</div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465.668.25 1.232.585 1.777 1.13.546.546.88 1.11 1.13 1.777.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.13 1.777 4.902 4.902 0 01-1.777 1.13c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.777-1.13 4.902 4.902 0 01-1.13-1.777c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427.25-.668.585-1.232 1.13-1.777.546-.546 1.11-.88 1.777-1.13.636-.247 1.363-.416 2.427-.465C9.516 2.013 9.87 2 12.3 2h.015zm0 4.53A5.47 5.47 0 106.8 12a5.47 5.47 0 005.47 5.47A5.47 5.47 0 0017.77 12a5.47 5.47 0 00-5.455-5.47zm0 9.01a3.54 3.54 0 110-7.08 3.54 3.54 0 010 7.08zm6.784-9.3a1.278 1.278 0 10-.001-2.556 1.278 1.278 0 00.001 2.556z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-light/60 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-dark border border-gray-light/20 rounded-sm px-4 py-3 text-light focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-light/60 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-dark border border-gray-light/20 rounded-sm px-4 py-3 text-light focus:border-primary focus:outline-none"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-light/60 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full bg-dark border border-gray-light/20 rounded-sm px-4 py-3 text-light focus:border-primary focus:outline-none"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-light/60 mb-1">
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full bg-dark border border-gray-light/20 rounded-sm px-4 py-3 text-light focus:border-primary focus:outline-none"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-primary text-dark font-medium py-3 rounded-sm hover:bg-primary/90 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}