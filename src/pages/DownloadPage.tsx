import { HeroSection } from '../components/index';
const DownloadPage: React.FC = (props) => {
  return (
    <div>
      <HeroSection
        title='Get Evernote'
        description='Evernote gives you everything you need to keep life organized—great note taking, project planning, and easy ways to find what you need, when you need it.'
        className=' mt-10 '
        primeBtn={{
          text: 'Download',
          route:
            'https://cdn1.evernote.com/boron/win/builds/Evernote-10.36.4-win-ddl-ga-3377-6d2f121c6a-setup.exe',
          isExteranl: true,
        }}
      />
    </div>
  );
};

export default DownloadPage;
