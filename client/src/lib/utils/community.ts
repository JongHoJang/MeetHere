export const getCommunityDisplayName = (community: string): string => {
  const communityMap: Record<string, string> = {
    JOSEPH: '요셉',
    DAVID: '다윗',
    ESTHER: '에스더',
    JOSHUA: '여호수아',
    DANIEL: '다니엘',
    PRISCILLA: '쁘아',
    MOSES: '모세',
  }

  return communityMap[community] || community
}
