import styles from 'common/components/Loaders/loaderApp/LoaderApp.module.css';

export const LoaderApp = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loader} />
    </div>
  );
};
