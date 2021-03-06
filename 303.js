// Events
// init() once the page has finished loading.
window.onload = init;

// Five sets of filter coefficients...
// There are five poles and one zero in this filter. There is an entry in this
// table for each of 64 resonance settings and a linear fit for the pole
// location in the s plane given a cutoff frequency
//  filterpoles[0][reso] -> pole 0 constant
//  filterpoles[1][reso] -> pole 0 slope
//  filterpoles[2][reso] -> pole 1/2 pair constant real
//  filterpoles[3][reso] -> pole 1/2 pair constant imag
//  filterpoles[4][reso] -> pole 1/2 pair slope real
//  filterpoles[5][reso] -> pole 1/2 pair slope imag
//  filterpoles[6][reso] -> pole 3/4 pair constant real
//  filterpoles[7][reso] -> pole 3/4 pair constant imag
//  filterpoles[8][reso] -> pole 3/4 pair slope real
//  filterpoles[9][reso] -> pole 3/4 pair slope imag

// The first pole/zero pair forms a 100Hz high-pass filter (but resonance
// feedback slightly affects the pole location / cutoff) formed by C27/R113 +
// C25/R114.  This 100Hz high pass filter in the feedback path is part of what
// makes it sound like a 303; without it, it's too resonant at lower
// frequencies and sounds like it's whistling fifths and octaves of the
// fundamental.
//
// The other four poles are of course the diode ladder filter; the
// linear fit is good down to about 200Hz cutoff, which is about the minimum
// it gets down to anyway.

var filterpoles = [
  [
    -1.42475857e-2, -1.10558351e-2, -9.58097367e-3, -8.63568249e-3,
    -7.94942757e-3, -7.4157056e-3, -6.98187179e-3, -6.61819537e-3,
    -6.30631927e-3, -6.03415378e-3, -5.79333654e-3, -5.57785533e-3,
    -5.38325013e-3, -5.20612558e-3, -5.04383985e-3, -4.89429884e-3,
    -4.75581571e-3, -4.62701254e-3, -4.50674977e-3, -4.3940746e-3,
    -4.28818259e-3, -4.18838855e-3, -4.09410427e-3, -4.00482112e-3,
    -3.92009643e-3, -3.83954259e-3, -3.76281836e-3, -3.68962181e-3,
    -3.61968451e-3, -3.55276681e-3, -3.48865386e-3, -3.42715236e-3,
    -3.36808777e-3, -3.31130196e-3, -3.25665127e-3, -3.20400476e-3,
    -3.15324279e-3, -3.10425577e-3, -3.05694308e-3, -3.01121207e-3,
    -2.96697733e-3, -2.92415989e-3, -2.88268665e-3, -2.84248977e-3,
    -2.80350622e-3, -2.76567732e-3, -2.72894836e-3, -2.69326825e-3,
    -2.65858922e-3, -2.62486654e-3, -2.59205824e-3, -2.56012496e-3,
    -2.52902967e-3, -2.49873752e-3, -2.4692157e-3, -2.44043324e-3,
    -2.41236091e-3, -2.38497108e-3, -2.35823762e-3, -2.33213577e-3,
    -2.30664208e-3, -2.2817343e-3, -2.2573913e-3, -2.23359302e-3,
  ],
  [
    1.6332367e-16, -1.61447133e-2, -1.9993207e-2, -2.09872e-2, -2.09377795e-2,
    -2.0447015e-2, -1.97637613e-2, -1.90036975e-2, -1.82242987e-2,
    -1.74550383e-2, -1.67110053e-2, -1.59995606e-2, -1.53237941e-2,
    -1.46844019e-2, -1.40807436e-2, -1.35114504e-2, -1.29747831e-2,
    -1.24688429e-2, -1.19916965e-2, -1.15414484e-2, -1.11162818e-2,
    -1.07144801e-2, -1.03344362e-2, -9.97465446e-3, -9.63374867e-3,
    -9.31043725e-3, -9.0035371e-3, -8.71195702e-3, -8.43469084e-3,
    -8.17081077e-3, -7.91946102e-3, -7.67985179e-3, -7.45125367e-3,
    -7.23299254e-3, -7.02444481e-3, -6.82503313e-3, -6.63422244e-3,
    -6.4515164e-3, -6.27645413e-3, -6.10860728e-3, -5.9475773e-3,
    -5.79299303e-3, -5.64450848e-3, -5.50180082e-3, -5.36456851e-3,
    -5.2325297e-3, -5.10542063e-3, -4.98299431e-3, -4.86501921e-3,
    -4.75127814e-3, -4.64156716e-3, -4.53569463e-3, -4.43348032e-3,
    -4.33475462e-3, -4.23935774e-3, -4.14713908e-3, -4.05795659e-3,
    -3.97167614e-3, -3.88817107e-3, -3.80732162e-3, -3.72901453e-3,
    -3.65314257e-3, -3.5796042e-3, -3.50830319e-3,
  ],
  [
    -1.83545593e-6, -1.35008051e-3, -1.51527847e-3, -1.61437715e-3,
    -1.68536679e-3, -1.74064961e-3, -1.78587681e-3, -1.82410854e-3,
    -1.85719118e-3, -1.88632533e-3, -1.91233586e-3, -1.93581405e-3,
    -1.95719818e-3, -1.97682215e-3, -1.99494618e-3, -2.011777e-3,
    -2.02748155e-3, -2.04219657e-3, -2.05603546e-3, -2.06909331e-3,
    -2.08145062e-3, -2.09317612e-3, -2.10432901e-3, -2.11496056e-3,
    -2.12511553e-3, -2.13483321e-3, -2.14414822e-3, -2.15309131e-3,
    -2.16168985e-3, -2.1699683e-3, -2.17794867e-3, -2.18565078e-3,
    -2.19309254e-3, -2.20029023e-3, -2.20725864e-3, -2.2140113e-3,
    -2.22056055e-3, -2.22691775e-3, -2.23309332e-3, -2.23909688e-3,
    -2.2449373e-3, -2.2506228e-3, -2.25616099e-3, -2.26155896e-3,
    -2.26682328e-3, -2.2719601e-3, -2.27697514e-3, -2.28187376e-3,
    -2.28666097e-3, -2.29134148e-3, -2.2959197e-3, -2.30039977e-3,
    -2.30478562e-3, -2.30908091e-3, -2.31328911e-3, -2.31741351e-3,
    -2.32145721e-3, -2.32542313e-3, -2.32931406e-3, -2.33313263e-3,
    -2.33688133e-3, -2.34056255e-3, -2.34417854e-3, -2.34773145e-3,
  ],
  [
    -2.96292613e-6, 6.75138822e-4, 6.9658105e-4, 7.04457808e-4, 7.07837502e-4,
    7.09169651e-4, 7.0941548e-4, 7.09031433e-4, 7.08261454e-4, 7.07246872e-4,
    7.06074484e-4, 7.04799978e-4, 7.03460301e-4, 7.02080606e-4, 7.00678368e-4,
    6.99265907e-4, 6.97852005e-4, 6.96442963e-4, 6.95043317e-4, 6.93656323e-4,
    6.92284301e-4, 6.90928882e-4, 6.89591181e-4, 6.88271928e-4, 6.86971561e-4,
    6.856903e-4, 6.84428197e-4, 6.83185182e-4, 6.81961088e-4, 6.8075568e-4,
    6.79568668e-4, 6.78399727e-4, 6.77248505e-4, 6.76114631e-4, 6.74997722e-4,
    6.73897392e-4, 6.72813249e-4, 6.71744904e-4, 6.70691972e-4, 6.69654071e-4,
    6.68630828e-4, 6.67621875e-4, 6.66626854e-4, 6.65645417e-4, 6.64677222e-4,
    6.6372194e-4, 6.62779248e-4, 6.61848835e-4, 6.60930398e-4, 6.60023644e-4,
    6.5912829e-4, 6.58244058e-4, 6.57370684e-4, 6.56507909e-4, 6.55655483e-4,
    6.54813164e-4, 6.53980718e-4, 6.53157918e-4, 6.52344545e-4, 6.51540387e-4,
    6.50745236e-4, 6.49958895e-4, 6.49181169e-4, 6.48411873e-4,
  ],
  [
    -1.00014774, -1.35336624, -1.42048887, -1.46551548, -1.50035433,
    -1.52916086, -1.55392254, -1.57575858, -1.59536715, -1.61321568,
    -1.62963377, -1.64486333, -1.6590876, -1.67244897, -1.68506052, -1.69701363,
    -1.70838333, -1.71923202, -1.72961221, -1.73956855, -1.74913935,
    -1.75835773, -1.76725258, -1.77584919, -1.7841699, -1.79223453, -1.80006075,
    -1.80766437, -1.81505964, -1.8222594, -1.8292753, -1.83611794, -1.84279698,
    -1.84932127, -1.85569892, -1.8619374, -1.8680436, -1.87402388, -1.87988413,
    -1.88562983, -1.89126607, -1.8967976, -1.90222885, -1.90756395, -1.91280679,
    -1.91796101, -1.92303002, -1.92801704, -1.93292509, -1.93775705,
    -1.94251559, -1.94720328, -1.95182252, -1.95637561, -1.96086471,
    -1.96529188, -1.96965908, -1.97396817, -1.97822093, -1.98241904,
    -1.98656411, -1.99065768, -1.99470122, -1.99869613,
  ],
  [
    1.30592376e-4, 3.54780202e-1, 4.22050344e-1, 4.67149412e-1, 5.02032084e-1,
    5.30867858e-1, 5.5565017e-1, 5.77501296e-1, 5.97121154e-1, 6.14978238e-1,
    6.31402872e-1, 6.4663744e-1, 6.60865515e-1, 6.74229755e-1, 6.86843408e-1,
    6.98798009e-1, 7.10168688e-1, 7.21017938e-1, 7.31398341e-1, 7.41354603e-1,
    7.50925074e-1, 7.60142923e-1, 7.69037045e-1, 7.77632782e-1, 7.85952492e-1,
    7.94016007e-1, 8.01841009e-1, 8.09443333e-1, 8.16837226e-1, 8.24035549e-1,
    8.31049962e-1, 8.37891065e-1, 8.44568531e-1, 8.51091211e-1, 8.57467223e-1,
    8.6370404e-1, 8.69808551e-1, 8.75787123e-1, 8.81645657e-1, 8.87389629e-1,
    8.93024133e-1, 8.98553916e-1, 9.03983409e-1, 9.09316756e-1, 9.14557836e-1,
    9.19710291e-1, 9.2477754e-1, 9.297628e-1, 9.34669099e-1, 9.39499296e-1,
    9.4425609e-1, 9.4894203e-1, 9.53559531e-1, 9.58110882e-1, 9.6259825e-1,
    9.67023698e-1, 9.71389181e-1, 9.75696562e-1, 9.79947614e-1, 9.84144025e-1,
    9.88287408e-1, 9.92379299e-1, 9.96421168e-1, 1.00041442,
  ],
  [
    -2.96209812e-6, -2.45794824e-4, -8.18027564e-4, -1.19157447e-3,
    -1.46371229e-3, -1.67529045e-3, -1.84698016e-3, -1.99058664e-3,
    -2.11344205e-3, -2.22039065e-3, -2.31478873e-3, -2.39905115e-3,
    -2.47496962e-3, -2.54390793e-3, -2.60692676e-3, -2.66486645e-3,
    -2.71840346e-3, -2.76809003e-3, -2.81438252e-3, -2.85766225e-3,
    -2.89825096e-3, -2.93642247e-3, -2.97241172e-3, -3.00642174e-3,
    -3.03862912e-3, -3.06918837e-3, -3.09823546e-3, -3.12589065e-3,
    -3.15226077e-3, -3.17744116e-3, -3.20151726e-3, -3.22456591e-3,
    -3.24665644e-3, -3.26785166e-3, -3.28820859e-3, -3.30777919e-3,
    -3.32661092e-3, -3.34474723e-3, -3.362228e-3, -3.37908995e-3, -3.3953669e-3,
    -3.41109012e-3, -3.42628855e-3, -3.44098902e-3, -3.45521647e-3,
    -3.4689941e-3, -3.48234354e-3, -3.49528498e-3, -3.50783728e-3,
    -3.52001812e-3, -3.53184405e-3, -3.54333061e-3, -3.55449241e-3,
    -3.5653432e-3, -3.5758959e-3, -3.58616273e-3, -3.5961552e-3, -3.60588419e-3,
    -3.61536e-3, -3.62459235e-3, -3.63359049e-3, -3.64236316e-3, -3.65091867e-3,
    -3.65926491e-3,
  ],
  [
    -7.7589475e-6, 3.11294169e-3, 3.41779455e-3, 3.52160375e-3, 3.55957019e-3,
    3.56903631e-3, 3.56431495e-3, 3.5519457e-3, 3.53526954e-3, 3.51613008e-3,
    3.49560287e-3, 3.47434152e-3, 3.45275527e-3, 3.43110577e-3, 3.40956242e-3,
    3.3882354e-3, 3.36719598e-3, 3.34648945e-3, 3.32614343e-3, 3.30617351e-3,
    3.28658692e-3, 3.26738515e-3, 3.24856568e-3, 3.2301233e-3, 3.21205091e-3,
    3.19434023e-3, 3.17698219e-3, 3.15996727e-3, 3.14328577e-3, 3.12692791e-3,
    3.110884e-3, 3.09514449e-3, 3.07970007e-3, 3.06454165e-3, 3.04966043e-3,
    3.0350479e-3, 3.02069585e-3, 3.00659636e-3, 2.9927418e-3, 2.97912486e-3,
    2.96573849e-3, 2.9525759e-3, 2.93963061e-3, 2.92689635e-3, 2.91436713e-3,
    2.90203718e-3, 2.88990095e-3, 2.87795312e-3, 2.86618855e-3, 2.85460234e-3,
    2.84318974e-3, 2.83194618e-3, 2.82086729e-3, 2.80994883e-3, 2.79918673e-3,
    2.78857707e-3, 2.77811607e-3, 2.76780009e-3, 2.75762559e-3, 2.74758919e-3,
    2.73768761e-3, 2.72791768e-3, 2.71827634e-3, 2.70876064e-3,
  ],
  [
    -9.99869423e-1, -6.38561407e-1, -5.6951453e-1, -5.23990915e-1,
    -4.8917678e-1, -4.60615628e-1, -4.36195579e-1, -4.14739573e-1,
    -3.95520699e-1, -3.78056805e-1, -3.62010728e-1, -3.47136887e-1,
    -3.33250504e-1, -3.20208824e-1, -3.07899106e-1, -2.96230641e-1,
    -2.85129278e-1, -2.74533563e-1, -2.64391946e-1, -2.54660728e-1,
    -2.45302512e-1, -2.36285026e-1, -2.27580207e-1, -2.19163487e-1,
    -2.11013226e-1, -2.03110249e-1, -1.95437482e-1, -1.87979648e-1,
    -1.80723016e-1, -1.73655197e-1, -1.66764971e-1, -1.60042136e-1,
    -1.53477393e-1, -1.47062234e-1, -1.40788856e-1, -1.3465008e-1,
    -1.28639289e-1, -1.22750366e-1, -1.16977645e-1, -1.11315866e-1,
    -1.05760138e-1, -1.003059e-1, -9.4948896e-2, -8.96851464e-2, -8.45109223e-2,
    -7.9422726e-2, -7.44172709e-2, -6.94914651e-2, -6.46423954e-2,
    -5.98673139e-2, -5.5163625e-2, -5.05288741e-2, -4.59607376e-2,
    -4.14570134e-2, -3.70156122e-2, -3.26345497e-2, -2.83119399e-2,
    -2.4045988e-2, -1.98349851e-2, -1.56773019e-2, -1.15713843e-2,
    -7.51574873e-3, -3.50897732e-3, 4.50285508e-4,
  ],
  [
    1.13389002e-4, 3.50509549e-1, 4.19971782e-1, 4.6683576e-1, 5.0305379e-1,
    5.32907131e-1, 5.58475931e-1, 5.80942937e-1, 6.01050219e-1, 6.19296203e-1,
    6.36032925e-1, 6.51518847e-1, 6.65949666e-1, 6.7947733e-1, 6.92222311e-1,
    7.04281836e-1, 7.15735567e-1, 7.26649641e-1, 7.37079603e-1, 7.47072578e-1,
    7.56668915e-1, 7.65903438e-1, 7.74806427e-1, 7.83404383e-1, 7.91720644e-1,
    7.99775871e-1, 8.0758845e-1, 8.15174821e-1, 8.22549745e-1, 8.29726527e-1,
    8.36717208e-1, 8.4353272e-1, 8.50183021e-1, 8.56677208e-1, 8.63023619e-1,
    8.69229911e-1, 8.75303138e-1, 8.81249811e-1, 8.87075954e-1, 8.92787154e-1,
    8.983886e-1, 9.03885123e-1, 9.09281227e-1, 9.14581119e-1, 9.19788738e-1,
    9.24907772e-1, 9.29941684e-1, 9.34893728e-1, 9.39766966e-1, 9.44564285e-1,
    9.49288407e-1, 9.53941905e-1, 9.58527211e-1, 9.6304663e-1, 9.67502344e-1,
    9.71896424e-1, 9.76230838e-1, 9.80507456e-1, 9.84728057e-1, 9.88894335e-1,
    9.93007906e-1, 9.9707031e-1, 1.00108302, 1.00504744,
  ],
];

var ctx, stag;
var t = 0;

// tb-303 / x0xb0x emulator. Comments in this file refer to x0xb0x components; see
// http://wiki.openmusiclabs.com/wiki/x0xb0x?action=AttachFile&do=get&target=mainboard2.png

// 640 samples per envelope update
var ENVINC = 64;
var f_smp = 44100; // samplerate
var bpm = 110; // 141.1927;

var vco_period = 0.0,
  vco_scale,
  vco_k = 0;

var vcf_cutoff = 0,
  vcf_envmod = 0,
  vcf_reso = 0,
  vcf_rescoeff = 0;

var vca_a = 0,
  vca_attack = 1.0 - 0.94406088,
  vca_decay = 0.99897516,
  vca_a0 = 0.5;

var f0b; // filter 0 numerator coefficients
var f0a; // filter 0 denominator coefficients
var f1b = 1; // filter 1 numerator, really just a gain compensation
var f1a = new Float32Array(2); // filter 1 denominator coefficients
var f2b = 1; // filter 2 numerator, same
var f2a = new Float32Array(2); // filter 2 denominator coefficients

function recalcParams() {
  vcf_e0 =
    ((Math.exp(5.22617147 + 1.70418937 * vcf_cutoff - 0.68382928 * vcf_envmod) +
      103) *
      (2 * Math.PI)) /
    f_smp;
  vcf_e1 =
    ((Math.exp(5.55921003 + 2.17788267 * vcf_cutoff + 1.99224351 * vcf_envmod) +
      103) *
      (2 * Math.PI)) /
      f_smp -
    vcf_e0;

  console.log({ vcf_e0, vcf_e1, vcf_cutoff, vcf_envmod });

  w = vcf_e0 + vcf_e1;

  var resoIdx = 0 | (vcf_reso * 63); // 64 slot available
  var reso_k = vcf_reso * 4.0; // feedback strength

  f0a = Math.exp(filterpoles[0][resoIdx] + w * filterpoles[1][resoIdx]);
  var exp_p1r = Math.exp(filterpoles[2][resoIdx] + w * filterpoles[4][resoIdx]);
  var p1i = filterpoles[3][resoIdx] + w * filterpoles[5][resoIdx];
  var exp_p2r = Math.exp(filterpoles[6][resoIdx] + w * filterpoles[8][resoIdx]);
  var p2i = filterpoles[7][resoIdx] + w * filterpoles[9][resoIdx];

  var targetgain = 2 / (1 + reso_k) + 0.5 * vcf_reso;

  f0b = (targetgain * (-1 - f0a)) / -2;

  f1a[0] = -2 * exp_p1r * Math.cos(p1i);
  f1a[1] = exp_p1r * exp_p1r;
  f1b = 1 + f1a[0] + f1a[1];

  f2a[0] = -2 * exp_p2r * Math.cos(p2i);
  f2a[1] = exp_p2r * exp_p2r;
  f2b = 1 + f2a[0] + f2a[1];

  // console.log({vcf_cutoff, vcf_envmod, resoIdx, vcf_reso});
  // console.log({ f0a, f0b, f1a, f1b, f2a, f2b });
}

function setCutoff(x) {
  vcf_cutoff = x;
  recalcParams();
}
function setReso(x) {
  vcf_reso = x;
  recalcParams();
}
function setEnvMod(x) {
  vcf_envmod = x;
  recalcParams();
}

function playNote(x) {
  vco_period = (f_smp / 440.0) * Math.pow(2, -(x - 57 - 12) / 12.0);
  vco_scale = 1.0 / (vco_period | 0);
}

var f0state = new Float32Array(1);
var f1state = new Float32Array(2);
var f2state = new Float32Array(2);

function filter(input) {
  var x = f0b * input + f0state[0];
  f0state[0] = -f0b * input + f0a * x;

  var y = f1b * x + f1state[0];
  f1state[0] = f1state[1] - f1a[0] * y;
  f1state[1] = -f1a[1] * y;

  var y2 = f2b * y + f2state[0];
  f2state[0] = f2state[1] - f2a[0] * y2;
  f2state[1] = -f2a[1] * y2;

  const output = y2;
  // const output = vca_a * y2;
  // vca_a += (vca_a0 - vca_a) * vca_attack;
  // console.log(vca_a);

  return output;
}

function synth(outbufL, outbufR, offset, size) {
  var w;
  size += offset;
  var trig_offset;
  for (var i = offset; i < size; i++) {
    // first stage: preamp, one-zero, one-pole highpass
    // var square = (vco_k < (vco_period>>1) ? vco_k * vco_scale : 1);
    // var x = square;
    var saw = vco_k * vco_scale - 0.5;
    var x = saw;
    // outbufL[i] = x; // hack: show the original wave on the scope

    outbufR[i] = filter(x);

    // update vco
    vco_k++;
    if (vco_k >= vco_period) {
      vco_k = 0;
      if (trig_offset == undefined) {
        trig_offset = i;
      }
    }
  }
}

var row_sample_idx = 0;
var samples_per_row = Math.floor((f_smp * 7.5) / bpm);
console.log("samples_per_row=", samples_per_row);
function audio_cb(e) {
  var buflen = e.outputBuffer.length;
  var dataL = e.outputBuffer.getChannelData(0);
  var dataR = e.outputBuffer.getChannelData(1);
  var offset = 0;

  while (buflen > 0) {
    var gen_length = Math.min(buflen, samples_per_row - row_sample_idx);
    synth(dataL, dataR, offset, gen_length);

    offset += gen_length;
    row_sample_idx += gen_length;
    if (row_sample_idx == samples_per_row) {
      // playNote(46);
      // or
      // releaseNote();
      row_sample_idx = 0;
    }
    buflen -= gen_length;
  }
  t += offset;

  for (var i = 0; i < e.outputBuffer.length; i++) {
    dataL[i] = dataR[i];
  }
}

function makeSlider(id, initialpos, cb) {
  cb(initialpos);
  document.getElementById(id).oninput = (e) => cb(Number(e.target.value));
}

function init() {
  makeSlider("cutoff", 0.5, setCutoff);
  makeSlider("reso", 0.7, setReso);
  makeSlider("envmod", 0.4, setEnvMod);
  playNote(46);
}

var jsNode, gainNode;
var playing = false;
function playpause() {
  if (!ctx) {
    ctx = new AudioContext();
    gainNode = ctx.createGain();
    gainNode.gain.value = 0.8;

    jsNode = ctx.createScriptProcessor(2048, 0, 2);
    jsNode.onaudioprocess = audio_cb;
    jsNode.connect(gainNode);
  }
  if (playing) {
    gainNode.disconnect(0);
    playing = false;
    document.getElementById("playbutton").innerHTML = "play";
  } else {
    gainNode.connect(ctx.destination);
    playing = true;
    document.getElementById("playbutton").innerHTML = "pause";
  }
}
