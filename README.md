# navigator-hugo-fork

A customized fork of the [Navigator Hugo theme](https://github.com/gethugothemes/navigator-hugo) adapted for the [PM Connect Conference](https://pmcc.pmi.org.pl).
There is very little left from the forked theme, but the reference above is included as credit.

This theme includes layout, style, and component modifications to meet the specific requirements of conference websites, including:

- Custom homepage layout 
- Enhanced menu configuration support
- Speaker and agenda support via Hugo data files
- todo ... later :-)

---

## 🚀 Features

- Tailored layout and styling for event/conference usage
- `data/*.yml` driven content for agenda, team, speakers, and partners
- Custom header/footer logic

---

## 🛠 How to Use

```bash
# Clone the forked theme into your Hugo site
git submodule add https://github.com/maciejkoszykowski/navigator-hugo-fork themes/navigator-hugo
```

Then in your `config.toml`:

```toml
theme = "navigator-hugo"
```

---

## 🔧 Local Development

To test with a sample PMCC site:

```bash
cd exampleSite
hugo server --themesDir ../..
```

---

## 📁 Structure Notes

This fork assumes content and configuration are maintained in the root Hugo site like this:

```
your-hugo-site/
├── config/_default/
├── data/
├── layouts/
├── static/
├── themes/
│   └── navigator-hugo/
```

Use `data/*.yml` files to power dynamic content such as agenda, team, speakers, etc.

---

## 📌 License

MIT — same as the upstream [Navigator theme](https://github.com/gethugothemes/navigator-hugo).

---

## 📬 Contact

Maintained by [Maciej Koszykowski](https://github.com/maciejkoszykowski). Contributions welcome via pull request.

