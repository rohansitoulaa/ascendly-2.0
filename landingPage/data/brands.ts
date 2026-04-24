export interface BrandItem {
  logo: string;
  brandName: string;
  url: string;
  /** true = dark logo on dark bg → invert to white. false/omit = already light/white */
  invert?: boolean;
}

export const brandList: BrandItem[] = [
  {
    logo: "https://res.cloudinary.com/dzsiqzfub/image/upload/v1754057864/antonioandparis_hmmali.png",
    brandName: "Antonio & Paris",
    url: "https://www.antonioandparis.com",
    invert: true,
  },
  {
    logo: "https://res.cloudinary.com/dzsiqzfub/image/upload/v1754057866/artechmedia_lklt2w.png",
    brandName: "Artech Media",
    url: "https://www.artechmedia.nl",
    invert: true,
  },
  {
    logo: "https://res.cloudinary.com/dzsiqzfub/image/upload/v1754057858/bondmedia_ypiti8.png",
    brandName: "Bond Media",
    url: "https://www.bondmedia.co.uk",
    invert: true,
  },
  {
    logo: "https://res.cloudinary.com/dzsiqzfub/image/upload/v1754057859/designtribe_vcltni.png",
    brandName: "Tropical Spark / Ecopets / Pelletics",
    url: "https://www.designtribe.com/en/home",
    invert: true,
  },
  {
    logo: "https://res.cloudinary.com/dzsiqzfub/image/upload/v1754057859/futureworks_ifvvak.png",
    brandName: "Future Works",
    url: "https://www.future.works",
    invert: true,
  },
  {
    logo: "https://res.cloudinary.com/dzsiqzfub/image/upload/v1754057860/greentech_uop8rv.png",
    brandName: "GreenTech Renewables",
    url: "https://www.greentechrenewables.com",
    invert: true,
  },
  {
    logo: "https://res.cloudinary.com/dzsiqzfub/image/upload/v1754057861/insightmedialabs_hhxjys.png",
    brandName: "Insight Media Labs",
    url: "https://www.insightmedialabs.com",
    invert: true,
  },
  {
    logo: "https://res.cloudinary.com/dzsiqzfub/image/upload/v1754057860/mycarbon_qxxktg.png",
    brandName: "MyCarbon",
    url: "https://www.mycarbon.co.uk",
    invert: true,
  },
  {
    logo: "https://res.cloudinary.com/dzsiqzfub/image/upload/v1754057861/nettsolutionsppc_lx1us1.png",
    brandName: "Nett Solutions PPC",
    url: "https://www.nettsolutionsppc.com",
    invert: true,
  },
  {
    logo: "https://res.cloudinary.com/dzsiqzfub/image/upload/v1754057862/questera_ed0wdy.png",
    brandName: "Questera",
    url: "https://www.questera.ai",
    invert: true,
  },
  {
    logo: "https://res.cloudinary.com/dzsiqzfub/image/upload/v1754057863/webaholics_nrutfx.png",
    brandName: "Webaholics",
    url: "https://www.webaholics.co",
    invert: true,
  },
  {
    logo: "https://res.cloudinary.com/dzsiqzfub/image/upload/v1754057864/xngage_ua6fwf.png",
    brandName: "Xngage",
    url: "https://www.xngage.com",
    invert: true,
  },
];
