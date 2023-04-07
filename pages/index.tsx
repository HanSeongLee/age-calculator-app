import type { NextPage } from 'next';
import styles from './style.module.scss';
import AgeCalculatorContainer from 'containers/AgeCalculatorContainer';
import Container from 'components/commons/Container';

const Home: NextPage = () => {
    return (
        <>
            <header>
                <h1 className={styles.hidden}>
                    {process.env.NEXT_PUBLIC_TITLE}
                </h1>
            </header>
            <main className={styles.main}>
                <Container>
                    <AgeCalculatorContainer />
                </Container>
            </main>
        </>
    );
};

export default Home
