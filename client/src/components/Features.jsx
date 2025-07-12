import React from 'react';

const features = [
  { title: 'Eco-Friendly', desc: 'Reduce waste and support sustainability.' },
  { title: 'Affordable Prices', desc: 'Trendy clothes at a fraction of the cost.' },
  { title: 'Quality Checked', desc: 'Every item goes through strict quality control.' },
];

const Features = () => {
  return (
    <section className="px-6 md:px-16 py-20 text-center bg-background">
      <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-primary">
        Why Choose Us?
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((f, idx) => (
          <div key={idx} className="bg-surface p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-2 text-clr">{f.title}</h3>
            <p className="text-muted">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
