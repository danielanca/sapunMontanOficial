import images from './../data/images';
const productList = [
  {
    title: 'Sapun Montan Carbune Activ ',
    price: '40',
    shortDescription: ' Un sapun dedicat fetei tale si minilor tale pentru o ingrijire in profunzime',
    firstDescription:
      'Pachetul de Scrub si Sapun indragit de toata lumea va garanteaza rasfatul pielii dvs. Săpunul negru ce conține cărbune activat pentru un ten neted  și mătăsos, este cel mai îndrăgit și utilizat de comunitatea Karbonoir. Acesta reprezintă ingrijirea optimă pentru toate tipurile de piele, inclusiv cea problematică, cu afecțuni precum (dermatita, acneea, coșuri, punctele negre și altele), deoarece purifică, detoxifică și absoarbe toxinele adunate in pori, lăsand pielea moale și catifelată.',
    ULbeneficii: ['Revigorează pielea', 'Curata in profunzime pielea'],
    productPicture: [images.sapunMontan.image, images.sapunMontan.image2, images.sapunMontan.image3],
  },
  {
    title: 'Scrub Montan 200gr',
    price: '35',
    firstDescription:
      'Pachetul de Scrub si Sapun indragit de toata lumea va garanteaza rasfatul pielii dvs. Săpunul negru ce conține cărbune activat pentru un ten neted  și mătăsos, este cel mai îndrăgit și utilizat de comunitatea Karbonoir. Acesta reprezintă ingrijirea optimă pentru toate tipurile de piele, inclusiv cea problematică, cu afecțuni precum (dermatita, acneea, coșuri, punctele negre și altele), deoarece purifică, detoxifică și absoarbe toxinele adunate in pori, lăsand pielea moale și catifelată.',
    ULbeneficii: ['Previne imbatranirea pielii', 'Ajuta la curatarea pielii'],
    productPicture: [images.cremaScrub.image, images.cremaScrub.image2, images.cremaScrub.image3],
  },
  {
    title: 'Scrub si Sapun Montan Pachet',
    price: '100',
    firstDescription:
      ' Pachetul de Scrub si Sapun indragit de toata lumea va garanteaza rasfatul pielii dvs.Pachetul de Scrub si Sapun indragit de toata lumea va garanteaza rasfatul pielii dvs.',
    ULbeneficii: ['Previne imbatranirea pielii', 'Ajuta la curatarea pielii'],
    productPicture: [images.pachetScrubSapun.image, images.pachetScrubSapun.image2, images.pachetScrubSapun.image3],
  },
];
export default productList;
