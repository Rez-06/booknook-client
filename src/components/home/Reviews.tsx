import { Star } from "lucide-react";

const reviews = [
  { name: "Nusrat Jahan", role: "University student", rating: 5, text: "I found a physics textbook I could not afford in minutes. Borrowing took two taps and returning was just as easy." },
  { name: "Rafi Ahmed", role: "Software engineer", rating: 5, text: "Clean, fast and simple. I love that I can see exactly how many copies are left before I commit." },
  { name: "Tasnim Karim", role: "School teacher", rating: 4, text: "My class shares picture books through BookNook. The kids love spotting the bookmark on the ones they borrowed." },
  { name: "Imran Hossain", role: "History buff", rating: 5, text: "The category filter makes browsing a joy. I discovered three new authors in one evening." },
  { name: "Sadia Rahman", role: "Book club host", rating: 4, text: "We pass around our club picks here. Seven days is a perfect borrowing window for a busy month." },
  { name: "Arif Chowdhury", role: "Parent", rating: 5, text: "Adding a book is quick and the cover upload just works. A small library that actually feels friendly." },
];

export default function Reviews() {
  return (
    <section>
      <p className="eyebrow mb-3">Readers say</p>
      <h2 className="section-title">Book Reviews</h2>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r) => (
          <figure key={r.name} className="flex h-full flex-col rounded-3xl border border-base-content/10 bg-base-200 p-6">
            <div className="flex gap-1 text-primary" aria-label={`${r.rating} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className={i < r.rating ? "fill-current" : "opacity-30"} />
              ))}
            </div>
            <blockquote className="mt-4 flex-1 font-serif text-xl leading-snug">&ldquo;{r.text}&rdquo;</blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-primary font-display text-primary-content">
                {r.name.charAt(0)}
              </span>
              <span>
                <span className="block font-mono text-xs font-bold uppercase">{r.name}</span>
                <span className="block text-xs opacity-60">{r.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
