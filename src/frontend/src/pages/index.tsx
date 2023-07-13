import VideoItem from "@/components/VideoItem"

export interface HomeProps { }



export const Home: React.FC<HomeProps> = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 32,
                paddingTop: 32,
                paddingBottom: 32,
                maxWidth: 996,
                margin: '0 auto',
            }}
        >
            {
                [1, 2, 3, 4].map(item => (
                    <VideoItem key={item} />
                ))
            }
        </div>
    )
}

export default Home
