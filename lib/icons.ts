// Maps the string icon names used in content/*.json to react-icons components.
// Add an entry here when you reference a new icon name in JSON.
import type { IconType } from 'react-icons';
import {
  FaGithub,
  FaBehance,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaFacebook,
  FaLinkedin,
  FaCode,
  FaMobileScreen,
  FaPenRuler,
  FaPalette,
  FaLightbulb,
  FaVideo,
  FaMugHot,
  FaClock,
  FaHeart,
  FaServer,
  FaMoneyBillTransfer,
  FaPlug,
  FaBrain,
  FaCloud,
  FaBriefcase,
  FaLayerGroup,
  FaCertificate,
  FaBuilding,
  FaJava,
} from 'react-icons/fa6';

const icons: Record<string, IconType> = {
  FaGithub,
  FaBehance,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaFacebook,
  FaLinkedin,
  FaCode,
  FaMobileScreen,
  FaPenRuler,
  FaPalette,
  FaLightbulb,
  FaVideo,
  FaMugHot,
  FaClock,
  FaHeart,
  FaServer,
  FaMoneyBillTransfer,
  FaPlug,
  FaBrain,
  FaCloud,
  FaBriefcase,
  FaLayerGroup,
  FaCertificate,
  FaBuilding,
  FaJava,
};

export function getIcon(name: string): IconType {
  return icons[name] ?? FaCode;
}
