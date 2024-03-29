import Odometer from 'react-odometerjs';
import styles from './Base.module.scss';
import classNames from 'classnames';
import { useMemo } from 'react';
import { useOsuMapFcPP } from 'socket';
import useJSONConfig from 'config';

export default function PpSSLabel({ visible = false }) {
	const config = useJSONConfig();
	const ifFcPP = useOsuMapFcPP(0, { duration: 250 });

	const renderer = useMemo(() => {
		let splitFcIndex = config.ssPhrase.indexOf('{pp}');
		if (splitFcIndex === -1) return () => config.fcPhrase;
		return (pp) => (
			<>
				<span className={styles.White}>{config.ssPhrase.substring(0, splitFcIndex)}</span>
				<Odometer key={'ifFcPPResult'} value={Math.round(pp)} duration={250} className={styles.PpDigit} />
				<span className={styles.White}>{config.ssPhrase.substring(splitFcIndex + 4)}</span>
			</>
		);
	}, [config]);

	return (
		<div
			className={classNames(styles.Pp, {
				[styles.PpVisible]: visible,
			})}
		>
			{renderer(ifFcPP)}
		</div>
	);
}
