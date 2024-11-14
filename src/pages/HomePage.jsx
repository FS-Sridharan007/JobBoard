import HeroSection from '../components/HeroSection';
import BrowseCategories from '../components/BrowseCategories';
import FeaturedJobs from '../components/FeaturedJobs';

function HomePage() {
  return (
    <div>
      <HeroSection />
      <BrowseCategories />
      <FeaturedJobs />
    </div>
  );
}

export default HomePage;
