import { City, Locality } from '../../shared/types/domain';

export const CITIES_SEED: City[] = [
  { id: 'city_kharar', name: 'Kharar', state: 'Punjab', isActive: true },
  { id: 'city_mohali', name: 'Mohali (SAS Nagar)', state: 'Punjab', isActive: true },
  { id: 'city_chandigarh', name: 'Chandigarh', state: 'UT', isActive: true },
  { id: 'city_panchkula', name: 'Panchkula', state: 'Haryana', isActive: true }
];

export const LOCALITIES_SEED: Locality[] = [
  // Kharar Localities
  { id: 'loc_kh_sunny', cityId: 'city_kharar', name: 'Sunny Enclave', centerLatitude: 30.7485, centerLongitude: 76.6578, isActive: true },
  { id: 'loc_kh_sec125', cityId: 'city_kharar', name: 'Sector 125', centerLatitude: 30.7432, centerLongitude: 76.6621, isActive: true },
  { id: 'loc_kh_sec115', cityId: 'city_kharar', name: 'Sector 115', centerLatitude: 30.7391, centerLongitude: 76.6510, isActive: true },
  { id: 'loc_kh_khanpur', cityId: 'city_kharar', name: 'Khanpur', centerLatitude: 30.7510, centerLongitude: 76.6450, isActive: true },
  { id: 'loc_kh_landran', cityId: 'city_kharar', name: 'Landran Road', centerLatitude: 30.7340, centerLongitude: 76.6690, isActive: true },
  { id: 'loc_kh_busstand', cityId: 'city_kharar', name: 'Kharar Bus Stand Area', centerLatitude: 30.7455, centerLongitude: 76.6420, isActive: true },

  // Mohali Localities
  { id: 'loc_mo_p1', cityId: 'city_mohali', name: 'Phase 1', centerLatitude: 30.7290, centerLongitude: 76.7150, isActive: true },
  { id: 'loc_mo_p3b2', cityId: 'city_mohali', name: 'Phase 3B2', centerLatitude: 30.7105, centerLongitude: 76.7170, isActive: true },
  { id: 'loc_mo_p5', cityId: 'city_mohali', name: 'Phase 5', centerLatitude: 30.7180, centerLongitude: 76.7210, isActive: true },
  { id: 'loc_mo_p7', cityId: 'city_mohali', name: 'Phase 7', centerLatitude: 30.7040, centerLongitude: 76.7120, isActive: true },
  { id: 'loc_mo_p8', cityId: 'city_mohali', name: 'Phase 8', centerLatitude: 30.6970, centerLongitude: 76.7080, isActive: true },
  { id: 'loc_mo_sec66', cityId: 'city_mohali', name: 'Sector 66', centerLatitude: 30.6780, centerLongitude: 76.7320, isActive: true },
  { id: 'loc_mo_sec67', cityId: 'city_mohali', name: 'Sector 67', centerLatitude: 30.6840, centerLongitude: 76.7280, isActive: true },
  { id: 'loc_mo_sec68', cityId: 'city_mohali', name: 'Sector 68', centerLatitude: 30.6910, centerLongitude: 76.7250, isActive: true },
  { id: 'loc_mo_sec70', cityId: 'city_mohali', name: 'Sector 70', centerLatitude: 30.7020, centerLongitude: 76.7010, isActive: true },
  { id: 'loc_mo_sec71', cityId: 'city_mohali', name: 'Sector 71', centerLatitude: 30.7090, centerLongitude: 76.6960, isActive: true },
  { id: 'loc_mo_sec79', cityId: 'city_mohali', name: 'Sector 79', centerLatitude: 30.6890, centerLongitude: 76.7120, isActive: true },
  { id: 'loc_mo_sec80', cityId: 'city_mohali', name: 'Sector 80', centerLatitude: 30.6830, centerLongitude: 76.7180, isActive: true },

  // Chandigarh Localities
  { id: 'loc_ch_sec15', cityId: 'city_chandigarh', name: 'Sector 15', centerLatitude: 30.7580, centerLongitude: 76.7720, isActive: true },
  { id: 'loc_ch_sec17', cityId: 'city_chandigarh', name: 'Sector 17 (City Center)', centerLatitude: 30.7410, centerLongitude: 76.7850, isActive: true },
  { id: 'loc_ch_sec22', cityId: 'city_chandigarh', name: 'Sector 22', centerLatitude: 30.7340, centerLongitude: 76.7770, isActive: true },
  { id: 'loc_ch_sec34', cityId: 'city_chandigarh', name: 'Sector 34', centerLatitude: 30.7220, centerLongitude: 76.7680, isActive: true },
  { id: 'loc_ch_sec35', cityId: 'city_chandigarh', name: 'Sector 35', centerLatitude: 30.7260, centerLongitude: 76.7610, isActive: true },
  { id: 'loc_ch_sec43', cityId: 'city_chandigarh', name: 'Sector 43', centerLatitude: 30.7140, centerLongitude: 76.7510, isActive: true },
  { id: 'loc_ch_sec44', cityId: 'city_chandigarh', name: 'Sector 44', centerLatitude: 30.7110, centerLongitude: 76.7590, isActive: true },
  { id: 'loc_ch_sec49', cityId: 'city_chandigarh', name: 'Sector 49', centerLatitude: 30.6970, centerLongitude: 76.7450, isActive: true },
  { id: 'loc_ch_sec50', cityId: 'city_chandigarh', name: 'Sector 50', centerLatitude: 30.6920, centerLongitude: 76.7520, isActive: true },

  // Panchkula Localities
  { id: 'loc_pa_sec5', cityId: 'city_panchkula', name: 'Sector 5', centerLatitude: 30.6980, centerLongitude: 76.8520, isActive: true },
  { id: 'loc_pa_sec8', cityId: 'city_panchkula', name: 'Sector 8', centerLatitude: 30.6910, centerLongitude: 76.8580, isActive: true },
  { id: 'loc_pa_sec9', cityId: 'city_panchkula', name: 'Sector 9', centerLatitude: 30.6860, centerLongitude: 76.8550, isActive: true },
  { id: 'loc_pa_sec10', cityId: 'city_panchkula', name: 'Sector 10', centerLatitude: 30.6830, centerLongitude: 76.8620, isActive: true },
  { id: 'loc_pa_sec11', cityId: 'city_panchkula', name: 'Sector 11', centerLatitude: 30.6890, centerLongitude: 76.8680, isActive: true },
  { id: 'loc_pa_sec12', cityId: 'city_panchkula', name: 'Sector 12', centerLatitude: 30.6960, centerLongitude: 76.8650, isActive: true },
  { id: 'loc_pa_sec15', cityId: 'city_panchkula', name: 'Sector 15', centerLatitude: 30.6780, centerLongitude: 76.8500, isActive: true },
  { id: 'loc_pa_sec20', cityId: 'city_panchkula', name: 'Sector 20', centerLatitude: 30.6650, centerLongitude: 76.8420, isActive: true }
];
