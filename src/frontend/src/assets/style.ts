import styled from 'styled-components'
export const PageWraper = styled.div`
    &.fadeIn{
        animation: 0.5s fadeIn linear;
    }
    @keyframe fadeIn{
        from{
            opacity: 0;
        }to {
            opacity: 1
        }
    }
    
`

