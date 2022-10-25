import { Helmet } from 'react-helmet'

function Meta({ title, description, keywords }){
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: `歡迎來到Music Shop`,
  description: '最好聽的音樂都在這裡',
  keywords: '專輯, 藝人, 國語歌曲, 外語歌曲',
}

export default Meta