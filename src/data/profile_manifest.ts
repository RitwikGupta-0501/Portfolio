export interface ProfileManifestConfig {
  name: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  leetcodeUrl: string;
  resumeUrl: string;
  tagline: string;
  availability: string;
}

export const PROFILE_MANIFEST: ProfileManifestConfig = {
  name: 'Ritwik Gupta',
  email: 'ritwikg.0501@gmail.com',
  githubUrl: 'https://github.com/RitwikGupta-0501',
  linkedinUrl: 'https://linkedin.com/in/gupta-ritwik',
  leetcodeUrl: 'https://leetcode.com/u/UNknowN_0501/',
  resumeUrl: 'https://drive.google.com/file/d/1067ovwvi7ktGbOLYezwrnDpAdWQCiOKK/view?usp=drive_link',
  tagline: 'Backend Software Engineer • Distributed Systems',
  availability: 'OPEN TO 6-MONTH INTERNSHIPS & FULL-TIME • 2027',
};

export const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    url: PROFILE_MANIFEST.githubUrl,
    iconType: 'github' as const,
  },
  {
    label: 'LinkedIn',
    url: PROFILE_MANIFEST.linkedinUrl,
    iconType: 'linkedin' as const,
  },
  {
    label: 'LeetCode',
    url: PROFILE_MANIFEST.leetcodeUrl,
    iconType: 'leetcode' as const,
  },
];
