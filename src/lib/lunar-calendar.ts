/**
 * Lunar Calendar Calculation Library
 * Ported from the original JavaScript implementation
 */

export interface LunarDate {
  day: number;
  month: number;
  year: number;
  isLeapMonth: boolean;
}

export interface SolarDate {
  day: number;
  month: number;
  year: number;
}

export interface HourInfo {
  chi: string;
  time: string;
  desc: string;
}

export interface DayHours {
  hoangDao: HourInfo[];
  hacDao: HourInfo[];
}

function INT(d: number): number {
  return Math.floor(d);
}

function jdFromDate(dd: number, mm: number, yy: number): number {
  const a = INT((14 - mm) / 12);
  const y = yy + 4800 - a;
  const m = mm + 12 * a - 3;
  let jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - INT(y / 100) + INT(y / 400) - 32045;
  if (jd < 2299161) {
    jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - 32083;
  }
  return jd;
}

function jdToDate(jd: number): [number, number, number] {
  let a: number, b: number, c: number;
  if (jd > 2299160) {
    a = jd + 32044;
    b = INT((4 * a + 3) / 146097);
    c = a - INT((b * 146097) / 4);
  } else {
    b = 0;
    c = jd + 32082;
  }
  const d = INT((4 * c + 3) / 1461);
  const e = c - INT((1461 * d) / 4);
  const m = INT((5 * e + 2) / 153);
  const day = e - INT((153 * m + 2) / 5) + 1;
  const month = m + 3 - 12 * INT(m / 10);
  const year = b * 100 + d - 4800 + INT(m / 10);
  return [day, month, year];
}

function NewMoon(k: number): number {
  const T = k / 1236.85;
  const T2 = T * T;
  const T3 = T2 * T;
  const dr = Math.PI / 180.0;
  
  let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
  Jd1 = Jd1 + 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
  
  const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
  const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
  const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
  
  const C1 = (0.1734 - 0.000393 * T) * Math.sin(dr * M)
    + 0.0021 * Math.sin(dr * 2 * M)
    - 0.4068 * Math.sin(dr * Mpr)
    + 0.0161 * Math.sin(dr * 2 * Mpr)
    - 0.0004 * Math.sin(dr * 3 * Mpr)
    + 0.0104 * Math.sin(dr * 2 * F)
    - 0.0051 * Math.sin(dr * (M + Mpr))
    - 0.0074 * Math.sin(dr * (M - Mpr))
    + 0.0004 * Math.sin(dr * (2 * F + M))
    - 0.0004 * Math.sin(dr * (2 * F - M))
    - 0.0006 * Math.sin(dr * (2 * F + Mpr))
    + 0.0010 * Math.sin(dr * (2 * F - Mpr))
    + 0.0005 * Math.sin(dr * (M + 2 * Mpr));
    
  let deltaT = 0;
  if (T < -11) {
    deltaT = 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T2 * T2;
  } else {
    deltaT = -0.000278 + 0.000265 * T + 0.000262 * T2;
  }
  
  return Jd1 + C1 - deltaT;
}

function getNewMoonDay(k: number, timeZone: number): number {
  return INT(NewMoon(k) + 0.5 + timeZone / 24.0);
}

function SunLongitude(jdn: number): number {
  const T = (jdn - 2451545.0) / 36525;
  const T2 = T * T;
  const dr = Math.PI / 180;
  const M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
  const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
  let DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
  DL = DL + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
  let L = L0 + DL;
  L = L * dr;
  L = L - Math.PI * 2 * (INT(L / (Math.PI * 2)));
  return INT(L / Math.PI * 6);
}

function getSunLongitude(dayNumber: number, timeZone: number): number {
  return INT(SunLongitude(dayNumber - 0.5 - timeZone / 24.0));
}

function getLunarMonth11(yy: number, timeZone: number): number {
  const off = jdFromDate(31, 12, yy) - 2415021;
  const k = INT(off / 29.530588853);
  let nm = getNewMoonDay(k, timeZone);
  const sunLong = getSunLongitude(nm, timeZone);
  if (sunLong >= 9) {
    nm = getNewMoonDay(k - 1, timeZone);
  }
  return nm;
}

function getLeapMonthOffset(a11: number, timeZone: number): number {
  const k = INT((a11 - 2415021.076998695) / 29.530588853 + 0.5);
  let last = 0;
  let i = 1;
  let arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
  do {
    last = arc;
    i++;
    arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
  } while (arc != last && i < 14);
  return i - 1;
}

export function convertSolar2Lunar(dd: number, mm: number, yy: number, timeZone: number = 7): LunarDate {
  const dayNumber = jdFromDate(dd, mm, yy);
  const k = INT((dayNumber - 2415021.076998695) / 29.530588853);
  let monthStart = getNewMoonDay(k + 1, timeZone);
  if (monthStart > dayNumber) {
    monthStart = getNewMoonDay(k, timeZone);
  }
  let a11 = getLunarMonth11(yy, timeZone);
  let b11 = a11;
  let lunarYear: number;
  if (a11 >= monthStart) {
    lunarYear = yy;
    a11 = getLunarMonth11(yy - 1, timeZone);
  } else {
    lunarYear = yy + 1;
    b11 = getLunarMonth11(yy + 1, timeZone);
  }
  const lunarDay = dayNumber - monthStart + 1;
  const diff = INT((monthStart - a11) / 29);
  let lunarLeap = false;
  let lunarMonth = diff + 11;
  if (b11 - a11 > 365) {
    const leapMonthDiff = getLeapMonthOffset(a11, timeZone);
    if (diff >= leapMonthDiff) {
      lunarMonth = diff + 10;
      if (diff == leapMonthDiff) {
        lunarLeap = true;
      }
    }
  }
  if (lunarMonth > 12) {
    lunarMonth = lunarMonth - 12;
  }
  if (lunarMonth >= 11 && diff < 4) {
    lunarYear -= 1;
  }
  return {
    day: lunarDay,
    month: lunarMonth,
    year: lunarYear,
    isLeapMonth: lunarLeap
  };
}

export function convertLunar2Solar(lunarDay: number, lunarMonth: number, lunarYear: number, lunarLeap: boolean, timeZone: number = 7): SolarDate {
  let a11: number, b11: number;
  if (lunarMonth < 11) {
    a11 = getLunarMonth11(lunarYear - 1, timeZone);
    b11 = getLunarMonth11(lunarYear, timeZone);
  } else {
    a11 = getLunarMonth11(lunarYear, timeZone);
    b11 = getLunarMonth11(lunarYear + 1, timeZone);
  }
  const k = INT(0.5 + (a11 - 2415021.076998695) / 29.530588853);
  let off = lunarMonth - 11;
  if (off < 0) {
    off += 12;
  }
  if (b11 - a11 > 365) {
    const leapOff = getLeapMonthOffset(a11, timeZone);
    let leapMonth = leapOff - 2;
    if (leapMonth < 0) {
      leapMonth += 12;
    }
    if (lunarLeap && lunarMonth != leapMonth) {
      return { day: 0, month: 0, year: 0 };
    } else if (lunarLeap || off >= leapOff) {
      off += 1;
    }
  }
  const monthStart = getNewMoonDay(k + off, timeZone);
  const [day, month, year] = jdToDate(monthStart + lunarDay - 1);
  return { day, month, year };
}

export function getCanChi(day: number, month: number, year: number): string {
  const can = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
  const chi = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
  
  const jd = jdFromDate(day, month, year);
  const canIndex = (jd + 9) % 10;
  const chiIndex = (jd + 1) % 12;
  
  return can[canIndex] + ' ' + chi[chiIndex];
}

export function getTietKhi(day: number, month: number, year: number): string {
  const tietKhi = [
    'Tiểu Hàn', 'Đại Hàn', 'Lập Xuân', 'Vũ Thủy', 'Kinh Trập', 'Xuân Phân',
    'Thanh Minh', 'Cốc Vũ', 'Lập Hạ', 'Tiểu Mãn', 'Mang Chủng', 'Hạ Chí',
    'Tiểu Thử', 'Đại Thử', 'Lập Thu', 'Xử Thử', 'Bạch Lộ', 'Thu Phân',
    'Hàn Lộ', 'Sương Giáng', 'Lập Đông', 'Tiểu Tuyết', 'Đại Tuyết', 'Đông Chí'
  ];
  
  const jd = jdFromDate(day, month, year);
  const sunLong = getSunLongitude(jd, 7);
  return tietKhi[sunLong];
}

export function getTruc(day: number, month: number, year: number): string {
  const truc = ['Kiến', 'Trừ', 'Mãn', 'Bình', 'Định', 'Chấp', 'Phá', 'Nguy', 'Thành', 'Thu', 'Khai', 'Bế'];
  const jd = jdFromDate(day, month, year);
  return truc[(jd + 4) % 12];
}

export function getGioHoangDao(day: number, month: number, year: number): DayHours {
  const chiHours = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
  const times = ['23:00-0:59', '1:00-2:59', '3:00-4:59', '5:00-6:59', '7:00-8:59', '9:00-10:59', 
                '11:00-12:59', '13:00-14:59', '15:00-16:59', '17:00-18:59', '19:00-20:59', '21:00-22:59'];
  
  const jd = jdFromDate(day, month, year);
  const dayIndex = (jd + 1) % 12;
  
  const hoangDaoPattern = [
    [0, 2, 3, 6, 7, 9], 
    [1, 3, 4, 7, 8, 10], 
    [0, 2, 4, 5, 8, 9, 11], 
    [1, 3, 5, 6, 9, 10], 
    [0, 2, 4, 6, 7, 10, 11], 
    [1, 3, 5, 7, 8, 11], 
    [0, 2, 4, 6, 8, 9], 
    [1, 3, 5, 7, 9, 10], 
    [0, 2, 4, 6, 8, 10, 11], 
    [1, 3, 5, 7, 9, 11], 
    [0, 2, 4, 6, 8, 10], 
    [1, 3, 5, 7, 9, 11] 
  ];
  
  const hoangDaoHours = hoangDaoPattern[dayIndex];
  const hacDaoHours: number[] = [];
  
  for (let i = 0; i < 12; i++) {
    if (!hoangDaoHours.includes(i)) {
      hacDaoHours.push(i);
    }
  }
  
  const hoangDao = hoangDaoHours.map(i => ({
    chi: chiHours[i],
    time: times[i],
    desc: 'Giờ tốt, thích hợp làm việc quan trọng'
  }));
  
  const hacDao = hacDaoHours.map(i => ({
    chi: chiHours[i],
    time: times[i],
    desc: 'Giờ xấu, nên tránh làm việc quan trọng'
  }));
  
  return { hoangDao, hacDao };
}

export function getDayName(dayIndex: number): string {
  const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  return days[dayIndex];
}

export function getMonthName(monthIndex: number): string {
  const months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
                 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
  return months[monthIndex];
}

export function getTetDate(year: number): Date {
  // Tết is the 1st day of the 1st lunar month
  const solar = convertLunar2Solar(1, 1, year, false);
  return new Date(solar.year, solar.month - 1, solar.day);
}
