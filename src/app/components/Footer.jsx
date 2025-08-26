const Footer = () => {
  return (
    <div className="flex flex-col mt-120 lg:mt-0 md:mt-0 sm:mt-0">
      <footer className="bg-white text-black text-center py-6 border-t-2 ">
        <p>© {new Date().getFullYear()} Davide Polizzi. All rights reserved.</p>
        <div className="mt-2 flex justify-center gap-6">
          <a
            href="https://github.com/Davipol"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/davide-polizzi-dev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a href="mailto:davide.polizzi15@gmail.com">Email</a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
